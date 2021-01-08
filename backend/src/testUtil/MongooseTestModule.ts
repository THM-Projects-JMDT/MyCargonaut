/**
 * @author https://dev.to/webeleon/unit-testing-nestjs-with-mongo-in-memory-54gd
 */
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as request from "supertest";
import { randomStringGenerator } from "@nestjs/common/utils/random-string-generator.util";

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = new MongoMemoryServer();
      const mongoUri = await mongod.getUri();
      return {
        uri: mongoUri,
        useCreateIndex: true,
        useFindAndModify: false,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (mongod) {
    await mongod.stop();
  }
};

export const loginAndGetJWTToken = async (service, app) => {
  const newUser = {
    username: randomStringGenerator(),
    password: "admin",
    firstName: "Test",
    lastName: "Test",
    ppPath: "images/test.png",
    birthday: new Date("11-09-1998"),
    email: randomStringGenerator() + "@mni.thm.de",
    cargoCoins: 3000,
  };
  await service.addUser(newUser);
  const response = await request(app.getHttpServer())
    .post("/auth/login")
    .send({ username: newUser.username, password: "admin" })
    .expect(201);
  return [response.body.access_token, newUser.username];
};

export const addOffer = async (app, localJwtToken, offer: boolean) => {
  return request(app.getHttpServer())
    .post("/offer/addOffer")
    .send({
      from: "Gießen",
      isOffer: offer,
      to: "Frankfurt",
      service: "transport",
      price: 50,
      seats: 2,
      storageSpace: 50,
      description: "Test",
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};
