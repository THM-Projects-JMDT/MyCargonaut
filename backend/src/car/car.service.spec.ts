import { Test, TestingModule } from "@nestjs/testing";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import {
  closeInMongodConnection,
  loginAndGetJWTToken,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Car, CarSchema } from "./car.schema";
import { INestApplication } from "@nestjs/common";
import { User, UserSchema } from "../users/user.schema";
import * as request from "supertest";
import { UsersService } from "../users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";
import { AuthController } from "../auth/auth.controller";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

describe("CarService", () => {
  let userService: UsersService;
  let service: CarService;
  let controller: CarController;
  let app: INestApplication;
  const newCar = {
    manufacturer: "Test",
    model: "A20",
    manufactureYear: 2021,
    seats: 4,
    storageSpace: 500,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        UsersModule,
        PassportModule,
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => ({
            secret: config.get("JWT_SECRET"),
            signOptions: { expiresIn: "600s" },
          }),
          inject: [ConfigService],
        }),
        ConfigModule,
        MongooseModule.forFeature([
          { name: Car.name, schema: CarSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [
        CarService,
        UsersService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
      ],
      controllers: [CarController, AuthController],
    }).compile();

    service = moduleRef.get<CarService>(CarService);
    controller = moduleRef.get<CarController>(CarController);
    userService = moduleRef.get<UsersService>(UsersService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it(`add car`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      app
    );
    const response = await request(app.getHttpServer())
      .post("/car")
      .send(newCar)
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(201);
    expect(response.body.model).toBe("A20");
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
