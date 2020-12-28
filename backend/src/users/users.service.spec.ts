import {Test, TestingModule} from "@nestjs/testing";
import {UsersService} from "./users.service";
import {UserController} from "./user.controller";

describe("UsersService", () => {
  let service: UsersService;
  let controller: UserController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    controller = moduleRef.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

});
