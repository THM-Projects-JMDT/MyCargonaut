import {Test, TestingModule} from "@nestjs/testing";
import {ChatService} from "./chat.service";
import {ChatController} from "./chat.controller";

describe("ChatService", () => {
  let service: ChatService;
  let controller: ChatController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
      controllers: [ChatController],
    }).compile();

    service = moduleRef.get<ChatService>(ChatService);
    controller = moduleRef.get<ChatController>(ChatController);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
