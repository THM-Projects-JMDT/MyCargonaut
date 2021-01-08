import { Test, TestingModule } from "@nestjs/testing";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from "../testUtil/MongooseTestModule";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offer.schema";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { UserController } from "../users/user.controller";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { LocalStrategy } from "../auth/strategies/local.strategy";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";

describe("OfferService", () => {
  let userService: UsersService;
  let service: OfferService;
  let controller: OfferController;
  let app: INestApplication;
  let jwtToken: string;
  const newUser = {
    username: "admin",
    password: "admin",
    firstName: "Jannik",
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
        MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
      ],
      providers: [OfferService, AuthService, LocalStrategy, JwtStrategy],
      controllers: [OfferController, AuthController],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    service = moduleRef.get<OfferService>(OfferService);
    controller = moduleRef.get<OfferController>(OfferController);

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
    await userService.addUser(newUser);
    const response = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "admin", password: "admin" })
      .expect(201);
    jwtToken = response.body.access_token;
  });
  afterAll(async () => {
    await closeInMongodConnection();
    await app.close();
  });
});
