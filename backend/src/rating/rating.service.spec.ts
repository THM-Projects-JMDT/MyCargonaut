import {Test, TestingModule} from '@nestjs/testing';
import {RatingService} from "./rating.service";
import {RatingController} from "./rating.controller";


describe('RatingService', () => {
  let service: RatingService;
  let controller: RatingController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [RatingService],
      controllers: [RatingController],
    }).compile();

    service = moduleRef.get<RatingService>(RatingService);
    controller = moduleRef.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
