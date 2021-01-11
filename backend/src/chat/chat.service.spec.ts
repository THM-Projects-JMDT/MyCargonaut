import { Test, TestingModule } from "@nestjs/testing";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import {
  addChat,
  addOffer,
  closeInMongodConnection,
  loginAndGetJWTToken,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./chat.schema";
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
import { StatusService } from "../status/status.service";
import { Status, StatusSchema } from "../status/status.schema";

describe("ChatService", () => {
  let userService: UsersService;
  let jwtService: JwtService;
  let service: ChatService;
  let controller: ChatController;
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
          { name: Chat.name, schema: ChatSchema },
          { name: Offer.name, schema: OfferSchema },
          { name: Rating.name, schema: RatingSchema },
          { name: Status.name, schema: StatusSchema },
        ]),
      ],
      providers: [
        ChatService,
        OfferService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        RatingService,
        StatusService,
      ],
      controllers: [ChatController, AuthController, OfferController],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<ChatService>(ChatService);
    controller = moduleRef.get<ChatController>(ChatController);
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

  it(`add chat`, async () => {
    let response = await addOffer(app, localJwtToken, true);
    response = await addChat(app, localJwtToken, response.body._id, "Hi");
    expect(response.body.content).toBe("Hi");
  });

  it(`get chat`, async () => {
    const offer = await addOffer(app, localJwtToken, true);
    await addChat(app, localJwtToken, offer.body._id, "Hi");
    let response = await request(app.getHttpServer())
      .get("/chat/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`);
    expect(response.body[0].content).toBe("Hi");
    await addChat(app, localJwtToken, offer.body._id, "Test123");
    response = await request(app.getHttpServer())
      .get("/chat/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`);
    expect(response.body[0].content).toBe("Hi");
    expect(response.body[1].content).toBe("Test123");
  });
  it(`chat get user works`, async () => {
    const [localJwtToken2, username2] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    const offer = await addOffer(app, localJwtToken, true);
    await addChat(app, localJwtToken, offer.body._id, "Hi");
    await addChat(app, localJwtToken2, offer.body._id, "Hallo");
    const response = await request(app.getHttpServer())
      .get("/chat/" + offer.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`);
    expect(response.body.length).toBe(2);

    const user1 = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    const user2 = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken2}`)
      .expect(200);

    expect(response.body[0].user).toBe(user1.body._id);
    expect(response.body[1].user).toBe(user2.body._id);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
