import { Test, TestingModule } from "@nestjs/testing";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import {
  addOffer,
  closeInMongodConnection,
  loginAndGetJWTToken,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offer.schema";
import { INestApplication } from "@nestjs/common";
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
import { RatingService } from "../rating/rating.service";
import { Rating, RatingSchema } from "../rating/rating.schema";
import { RatingController } from "../rating/rating.controller";
import { Status, StatusSchema } from "../status/status.schema";
import { StatusService } from "../status/status.service";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";

describe("OfferService", () => {
  let userService: UsersService;
  let jwtService: JwtService;
  let service: OfferService;
  let controller: OfferController;
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
        OfferService,
        AuthService,
        RatingService,
        LocalStrategy,
        JwtStrategy,
        StatusService,
      ],
      controllers: [OfferController, AuthController, RatingController],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<OfferService>(OfferService);
    controller = moduleRef.get<OfferController>(OfferController);
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

  it(`add offer`, async () => {
    const response = await addOffer(app, localJwtToken, true);
    expect(response.body.description).toBe("Test");
  });
  it(`get my offers`, async () => {
    let response = await request(app.getHttpServer())
      .get("/offer?forOffer=true&forPrivate=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(0);
    await addOffer(app, localJwtToken, true);
    await addOffer(app, localJwtToken, true);
    await addOffer(app, localJwtToken, false);
    response = await request(app.getHttpServer())
      .get("/offer?forOffer=true&forPrivate=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].from).toBe("Gießen");
  });
  it(`get all offers`, async () => {
    const [localJwtToken2, username2] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    await addOffer(app, localJwtToken, true);
    await addOffer(app, localJwtToken2, true);
    await addOffer(app, localJwtToken2, false);
    let response = await request(app.getHttpServer())
      .get("/offer?forOffer=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(2);
    await addOffer(app, localJwtToken2, false);
    response = await request(app.getHttpServer())
      .get("/offer")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(2);
  });

  it(`delete offer`, async () => {
    const offer = await addOffer(app, localJwtToken, true);
    await addOffer(app, localJwtToken, true);
    let response = await request(app.getHttpServer())
      .get("/offer?forOffer=true&forPrivate=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(2);
    await request(app.getHttpServer())
      .delete("/offer/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    response = await request(app.getHttpServer())
      .get("/offer?forOffer=true&forPrivate=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(1);
  });

  it(`edit offer`, async () => {
    let response = await addOffer(app, localJwtToken, true);
    await request(app.getHttpServer())
      .put("/offer/" + response.body._id)
      .send({
        from: "Grünberg",
        to: "Frankfurt",
        service: "transport",
        price: 50,
        seats: 2,
        storageSpace: 50,
        description: "Test",
      })
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    response = await request(app.getHttpServer())
      .get("/offer?forOffer=true&forPrivate=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body[0].from).toBe("Grünberg");
  });

  it(`book offer`, async () => {
    const [localJwtToken2, username2] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    const offer = await addOffer(app, localJwtToken, true);
    await request(app.getHttpServer())
      .post("/offer/bookOffer/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken2}`)
      .expect(201);
    const response = await request(app.getHttpServer())
      .get("/offer?forOffer=true&forPrivate=true")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    const user1 = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    const user2 = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken2}`)
      .expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].provider).toBe(user1.body._id);
    expect(response.body[0].customer).toBe(user2.body._id);
    expect(user1.body.cargoCoins).toBe(3050);
    expect(user2.body.cargoCoins).toBe(2950);
    expect(response.body[0].tracking.state).toBe("Waiting");
  });

  it(`book offer with no money`, async () => {
    const newUser = {
      username: randomStringGenerator(),
      password: "admin",
      firstName: "Test",
      lastName: "Test",
      ppPath: "images/test.png",
      birthday: new Date("11-09-1998"),
      email: randomStringGenerator() + "@mni.thm.de",
      cargoCoins: 0,
    };
    const user = await userService.addUser(newUser);

    const payload = { id: user._id };
    const localJwtToken2 = jwtService.sign(payload);

    const offer = await addOffer(app, localJwtToken, true);
    await request(app.getHttpServer())
      .post("/offer/bookOffer/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken2}`)
      .expect(400);
    const user1 = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    const user2 = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken2}`)
      .expect(200);

    expect(user1.body.cargoCoins).toBe(3000);
    expect(user2.body.cargoCoins).toBe(0);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
