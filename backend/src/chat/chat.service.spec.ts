import { Test, TestingModule } from "@nestjs/testing";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./chat.schema";
import { INestApplication } from "@nestjs/common";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { OfferService } from "../offer/offer.service";

describe("ChatService", () => {
  let service: ChatService;
  let controller: ChatController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Chat.name, schema: ChatSchema },
          { name: Offer.name, schema: OfferSchema },
        ]),
      ],
      providers: [ChatService, OfferService],
      controllers: [ChatController],
    }).compile();

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
  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
