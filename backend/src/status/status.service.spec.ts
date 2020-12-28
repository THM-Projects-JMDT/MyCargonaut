import {Test, TestingModule} from '@nestjs/testing';
import {StatusService} from "./status.service";
import {StatusController} from "./status.controller";

describe('StatusService', () => {
  let service: StatusService;
  let controller: StatusController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [StatusService],
      controllers: [StatusController],
    }).compile();

    service = moduleRef.get<StatusService>(StatusService);
    controller = moduleRef.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
