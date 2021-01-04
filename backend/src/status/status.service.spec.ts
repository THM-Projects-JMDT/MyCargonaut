import { Test, TestingModule } from "@nestjs/testing";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Status, StatusSchema } from "./status.schema";
import { INestApplication } from "@nestjs/common";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { OfferService } from "../offer/offer.service";

describe("StatusService", () => {
  let service: StatusService;
  let controller: StatusController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Status.name, schema: StatusSchema },
          { name: Offer.name, schema: OfferSchema },
        ]),
      ],
      providers: [StatusService, OfferService],
      controllers: [StatusController],
    }).compile();

    service = moduleRef.get<StatusService>(StatusService);
    controller = moduleRef.get<StatusController>(StatusController);

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
