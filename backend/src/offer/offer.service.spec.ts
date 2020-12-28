import { Test, TestingModule } from "@nestjs/testing";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";

describe("OfferService", () => {
  let service: OfferService;
  let controller: OfferController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [OfferService],
      controllers: [OfferController],
    }).compile();

    service = moduleRef.get<OfferService>(OfferService);
    controller = moduleRef.get<OfferController>(OfferController);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
