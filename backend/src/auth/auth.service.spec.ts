import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";

describe("AuthService", () => {
  let service: AuthService;
  let controller: AuthController;
  let app: INestApplication;
  let jwtToken: string;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: "60s" },
        }),
      ],

      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
    controller = moduleRef.get<AuthController>(AuthController);

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

  it(`login`, async () => {
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "admin", password: "admin" })
      .expect(201);
    jwtToken = response.body.access_token;
  });

  it(`logout with login before`, () => {
    return request(app.getHttpServer())
      .post("/auth/logout")
      .set("Authorization", `Bearer ${jwtToken}`)
      .expect(201);
  });

  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
