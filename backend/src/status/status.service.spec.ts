import { Test, TestingModule } from "@nestjs/testing";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import {
  addOffer,
  addStatus,
  closeInMongodConnection,
  loginAndGetJWTToken,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Status, StatusSchema } from "./status.schema";
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
import { Rating, RatingSchema } from "../rating/rating.schema";
import { RatingService } from "../rating/rating.service";

describe("StatusService", () => {
  let userService: UsersService;
  let jwtService: JwtService;
  let service: StatusService;
  let controller: StatusController;
  let app: INestApplication;
  let localJwtToken;
  let username;

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
          { name: Status.name, schema: StatusSchema },
          { name: Offer.name, schema: OfferSchema },
          { name: Rating.name, schema: RatingSchema },
        ]),
      ],
      providers: [
        StatusService,
        OfferService,
        AuthService,
        LocalStrategy,
        RatingService,
        JwtStrategy,
      ],
      controllers: [StatusController, AuthController, OfferController],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<StatusService>(StatusService);
    controller = moduleRef.get<StatusController>(StatusController);
    jwtService = moduleRef.get<JwtService>(JwtService);

    app = moduleRef.createNestApplication();
    await app.init();

    const result = await loginAndGetJWTToken(userService, jwtService, app);
    localJwtToken = result[0];
    username = result[1];
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it(`add status`, async () => {
    let response = await addOffer(app, localJwtToken, true);
    response = await addStatus(
      app,
      localJwtToken,
      response.body._id,
      "Waiting"
    );
    expect(response.body.state).toBe("Waiting");
  });

  it(`get status delete status`, async () => {
    const offer = await addOffer(app, localJwtToken, true);

    await addStatus(app, localJwtToken, offer.body._id, "Waiting");
    let response = await request(app.getHttpServer())
      .get("/status/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`);
    expect(response.body.state).toBe("Waiting");
    expect(response.body.createDate).toBeDefined();
    await addStatus(app, localJwtToken, offer.body._id, "InProgress");
    response = await request(app.getHttpServer())
      .get("/status/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`);
    expect(response.body.state).toBe("InProgress");
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
