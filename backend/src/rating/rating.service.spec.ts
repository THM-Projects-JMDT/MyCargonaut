import { Test, TestingModule } from "@nestjs/testing";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Rating, RatingSchema } from "./rating.schema";
import { INestApplication } from "@nestjs/common";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { OfferService } from "../offer/offer.service";

describe("RatingService", () => {
  let service: RatingService;
  let controller: RatingController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Rating.name, schema: RatingSchema },
          { name: Offer.name, schema: OfferSchema },
        ]),
      ],
      providers: [RatingService, OfferService],
      controllers: [RatingController],
    }).compile();

    service = moduleRef.get<RatingService>(RatingService);
    controller = moduleRef.get<RatingController>(RatingController);

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
