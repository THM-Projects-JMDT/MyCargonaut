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
import { UsersModule } from "./users.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import * as request from "supertest";
import { AuthService } from "../auth/auth.service";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { AuthController } from "../auth/auth.controller";

describe("UsersService", () => {
  let service: UsersService;
  let controller: UserController;
  let app: INestApplication;
  let jwtToken: string;
  const newUser = {
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

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it(`login`, async () => {
    await service.addUser(newUser);
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "admin2", password: "admin" })
      .expect(201);
    jwtToken = response.body.access_token;
  });

  it("add user", async () => {
    const user = await service.addUser(newUser);
    expect(user.firstName).toBe("Test");
  });

  it("findOne works", async () => {
    await service.addUser(newUser);
    const user = await service.findOne("admin2");
    expect(user.firstName).toBe("Test");
  });

  it("get all length is 1", async () => {
    await service.addUser(newUser);
    const users = await service.getAll();
    expect(users.length).toBe(1);
  });

  /**
   * test not correct jwt need change first
   */

  it(`get user`, async () => {
    await service.addUser(newUser);
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "admin2", password: "admin" })
      .expect(201);
    let localJwtToken = response.body.access_token;
    return request(app.getHttpServer())
      .get("/user")
      .set("Authorization", `Bearer ${localJwtToken}`)
      .expect(200);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
