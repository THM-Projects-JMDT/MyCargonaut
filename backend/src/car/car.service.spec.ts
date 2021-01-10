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
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";
import { AuthController } from "../auth/auth.controller";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";

describe("CarService", () => {
  let userService: UsersService;
  let jwtService: JwtService;
  let service: CarService;
  let controller: CarController;
  let app: INestApplication;

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
    jwtService = moduleRef.get<JwtService>(JwtService);

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
      jwtService,
      app
    );
    const response = await addCar(app, localJwtToken);
    expect(response.body.model).toBe("A20");
  });
  it(`get my cars`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    let response = await request(app.getHttpServer())
      .get("/car")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(0);
    await addCar(app, localJwtToken);
    await addCar(app, localJwtToken);
    response = await request(app.getHttpServer())
      .get("/car")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].model).toBe("A20");
  });

  it(`edit car`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    let response = await addCar(app, localJwtToken);
    response = await request(app.getHttpServer())
      .put("/car/" + response.body._id)
      .send({
        manufacturer: randomStringGenerator(),
        model: "A10",
        manufactureYear: 2021,
        seats: 4,
        storageSpace: 500,
      })
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body[0].model).toBe("A10");
  });

  it(`delete car`, async () => {
    const [localJwtToken, username] = await loginAndGetJWTToken(
      userService,
      jwtService,
      app
    );
    let response = await addCar(app, localJwtToken);
    await request(app.getHttpServer())
      .delete("/car/" + response.body._id)
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    response = await request(app.getHttpServer())
      .get("/car")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.length).toBe(0);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});

export const addCar = async (app, localJwtToken) => {
  return request(app.getHttpServer())
    .post("/car")
    .send({
      manufacturer: randomStringGenerator(),
      model: "A20",
      manufactureYear: 2021,
      seats: 4,
      storageSpace: 500,
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};
