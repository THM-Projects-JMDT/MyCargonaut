import {Test, TestingModule} from '@nestjs/testing';
import {CarService} from "./car.service";
import {CarController} from "./car.controller";

describe('CarService', () => {
  let service: CarService;
  let controller: CarController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [CarService],
      controllers: [CarController],
    }).compile();

    service = moduleRef.get<CarService>(CarService);
    controller = moduleRef.get<CarController>(CarController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
