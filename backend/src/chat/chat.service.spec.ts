import { Test, TestingModule } from "@nestjs/testing";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import {
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
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { OfferController } from "../offer/offer.controller";

describe("ChatService", () => {
  let userService: UsersService;
  let service: ChatService;
  let controller: ChatController;
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
          { name: Chat.name, schema: ChatSchema },
          { name: Offer.name, schema: OfferSchema },
        ]),
      ],
      providers: [
        ChatService,
        OfferService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
      ],
      controllers: [ChatController, AuthController, OfferController],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<ChatService>(ChatService);
    controller = moduleRef.get<ChatController>(ChatController);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it(`add chat`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      app
    );
    let response = await addOffer(app, localJwtToken, true);
    response = await addChat(app, localJwtToken, response.body._id, "Hi");
    expect(response.body.content).toBe("Hi");
  });

  it(`get chat`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      app
    );
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

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});

export const addChat = async (
  app,
  localJwtToken,
  offerId: string,
  content: string
) => {
  return request(app.getHttpServer())
    .post("/chat/" + offerId)
    .send({
      content: content,
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};
