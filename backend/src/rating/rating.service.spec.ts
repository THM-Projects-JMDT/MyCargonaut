import { Test, TestingModule } from "@nestjs/testing";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";
import {
  addOffer,
  closeInMongodConnection,
  loginAndGetJWTToken,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Rating, RatingSchema } from "./rating.schema";
import { INestApplication } from "@nestjs/common";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { OfferService } from "../offer/offer.service";
import * as request from "supertest";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { OfferController } from "../offer/offer.controller";
import { Status, StatusSchema } from "../status/status.schema";
import { StatusService } from "../status/status.service";

describe("RatingService", () => {
  let userService: UsersService;
  let jwtService: JwtService;
  let service: RatingService;
  let controller: RatingController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        UsersModule,
        PassportModule,
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            secret: config.get("JWT_SECRET"),
            signOptions: { expiresIn: "600s" },
          }),
          inject: [ConfigService],
        }),
        ConfigModule,
        MongooseModule.forFeature([
          { name: Rating.name, schema: RatingSchema },
          { name: Offer.name, schema: OfferSchema },
          { name: Status.name, schema: StatusSchema },
        ]),
      ],
      providers: [
        RatingService,
        OfferService,
        StatusService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
      ],
      controllers: [RatingController, AuthController, OfferController],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<RatingService>(RatingService);
    controller = moduleRef.get<RatingController>(RatingController);
    jwtService = moduleRef.get<JwtService>(JwtService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it(`add rating`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    let response = await addOffer(app, localJwtToken, true);
    response = await addRating(app, localJwtToken, response.body._id);
    expect(response.body.rating).toBe(5);
  });

  it(`get rating`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    let response = await addOffer(app, localJwtToken, true);
    await addRating(app, localJwtToken, response.body._id);
    response = await request(app.getHttpServer())
      .get("/rating/" + response.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`);
    expect(response.body.rating).toBe(5);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});

export const addRating = async (app, localJwtToken, offerId: string) => {
  return request(app.getHttpServer())
    .post("/rating/" + offerId)
    .send({
      text: "Alles Top",
      rating: 5,
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};
