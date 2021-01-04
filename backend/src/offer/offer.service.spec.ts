import { Test, TestingModule } from "@nestjs/testing";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offer.schema";
import { INestApplication } from "@nestjs/common";

describe("OfferService", () => {
  let service: OfferService;
  let controller: OfferController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
      ],
      providers: [OfferService],
      controllers: [OfferController],
    }).compile();

    service = moduleRef.get<OfferService>(OfferService);
    controller = moduleRef.get<OfferController>(OfferController);

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
