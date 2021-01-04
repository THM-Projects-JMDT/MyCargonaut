import { Test, TestingModule } from "@nestjs/testing";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Car, CarSchema } from "./car.schema";
import { INestApplication } from "@nestjs/common";
import { User, UserSchema } from "../users/user.schema";

describe("CarService", () => {
  let service: CarService;
  let controller: CarController;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: Car.name, schema: CarSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [CarService],
      controllers: [CarController],
    }).compile();

    service = moduleRef.get<CarService>(CarService);
    controller = moduleRef.get<CarController>(CarController);

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
