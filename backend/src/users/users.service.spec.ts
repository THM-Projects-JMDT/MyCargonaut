import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UserController } from "./user.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { INestApplication } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;
  let controller: UserController;
  let app: INestApplication;
  let newUser = {
    username: "admin2",
    password: "admin",
    firstName: "Test",
    lastName: "Lapp",
    ppPath: "images/test.png",
    birthday: new Date("11-09-1998"),
    email: "jannik.lapp@mni.thm.de",
    cargoCoins: 3000,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [UsersService],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    controller = moduleRef.get<UserController>(UserController);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("add user", async () => {
    let user = await service.addUser(newUser);
    expect(user.firstName).toBe("Test");
  });

  it("findOne works", async () => {
    await service.addUser(newUser);
    let user = await service.findOne("admin2");
    expect(user.firstName).toBe("Test");
  });

  it("get all length is 1", async () => {
    await service.addUser(newUser);
    let users = await service.getAll();
    expect(users.length).toBe(1);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
