import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UserController } from "./user.controller";
import {
  closeInMongodConnection,
  loginAndGetJWTToken,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { INestApplication } from "@nestjs/common";
import { UsersModule } from "./users.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import * as request from "supertest";
import { AuthService } from "../auth/auth.service";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { AuthController } from "../auth/auth.controller";

describe("UsersService", () => {
  let service: UsersService;
  let jwtService: JwtService;
  let controller: UserController;
  let app: INestApplication;
  let localJwtToken;
  let username;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UserController, AuthController],
      providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    controller = moduleRef.get<UserController>(UserController);
    jwtService = moduleRef.get<JwtService>(JwtService);

    app = moduleRef.createNestApplication();
    await app.init();

    const result = await loginAndGetJWTToken(service, jwtService, app);
    localJwtToken = result[0];
    username = result[1];
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("add user", async () => {
    const user = await service.addUser({
      username: "admin2",
      password: "admin",
      firstName: "Test",
      lastName: "Lapp",
      ppPath: "images/test.png",
      birthday: new Date("11-09-1998"),
      email: "jannik.lapp@mni.thm.de",
      cargoCoins: 3000,
    });
    expect(user.firstName).toBe("Test");
  });

  it("findOne works", async () => {
    await loginAndGetJWTToken(service, jwtService, app);
    const user = await service.findOne(username);
    expect(user.lastName).toBe("Test");
  });

  it(`get user`, async () => {
    const response = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.lastName).toBe("Test");
  });

  it(`edit user`, async () => {
    const response = await request(app.getHttpServer())
      .put("/user")
      .send({
        firstName: "Test123",
        lastName: "TestABC",
        email: "test@test.de",
        ppPath: "test.img",
      })
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.lastName).toBe("TestABC");
  });

  it(`addMoney`, async () => {
    let response = await request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
    expect(response.body.cargoCoins).toBe(3000);
    response = await request(app.getHttpServer())
      .post("/user/addMoney/20")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(201);
    expect(response.body.cargoCoins).toBe(3020);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
