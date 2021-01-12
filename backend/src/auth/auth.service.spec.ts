import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";

describe("AuthService", () => {
  let userService: UsersService;
  let service: AuthService;
  let jwtService: JwtService;
  let controller: AuthController;
  let app: INestApplication;
  let jwtToken: string;
  const newUser = {
    username: "admin",
    password: "admin",
    firstName: "Jannik",
    lastName: "Lapp",
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
      ],

      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();
    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<AuthService>(AuthService);
    controller = moduleRef.get<AuthController>(AuthController);
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

  it(`logout without login`, () => {
    return request(app.getHttpServer())
      .post("/auth/logout")
      .expect(401)
      .expect({ statusCode: 401, message: "Unauthorized" });
  });

  it(`check if registry and login works`, async () => {
    await request(app.getHttpServer()).post("/auth/register").send(newUser);
    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "admin", password: "admin" })
      .expect(201);
    const payload = { id: res.body._id };
    jwtToken = jwtService.sign(payload);
  });

  it(`logout with login before`, () => {
    return request(app.getHttpServer())
      .post("/auth/logout")
      .set("Authorization", `Bearer ${jwtToken}`)
      .expect(201);
  });
  it(`check if im login when logged in`, () => {
    return request(app.getHttpServer())
      .get("/auth/login")
      .set("Authorization", `Bearer ${jwtToken}`)
      .expect(200);
  });

  it(`check if im login when not logged in`, () => {
    return request(app.getHttpServer())
      .get("/auth/login")
      .expect(401)
      .expect({ statusCode: 401, message: "Unauthorized" });
  });
  it(`register`, async () => {
    const result = await request(app.getHttpServer())
      .post("/auth/register")
      .send({
        username: "admin456",
        password: "admin",
        firstName: "Jannik",
        lastName: "Lapp",
        birthday: new Date("11-09-1998"),
        email: "jannik.lapp@mni.thm.de",
      })
      .expect(201);
    expect(result.body.username).toBe("admin456");
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
