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

export const loginAndGetJWTToken = async (service, jwtService, app) => {
  const newUser = {
    username: randomStringGenerator(),
    password: "admin",
    firstName: "Test",
    lastName: "Test",
    birthday: new Date("11-09-1998"),
    email: randomStringGenerator() + "@mni.thm.de",
    cargoCoins: 3000,
  };
  const user = await service.addUser(newUser);

  const payload = { id: user._id };
  const token = jwtService.sign(payload);
  return [token, newUser.username];
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

export const addChat = async (
  app,
  localJwtToken,
  offerId: string,
  content: string
) => {
  return request(app.getHttpServer())
    .post("/chat/" + offerId)
    .send({
      content: content,
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};

export const addRating = async (app, localJwtToken, offerId: string) => {
  return request(app.getHttpServer())
    .post("/rating/" + offerId)
    .send({
      text: "Alles Top",
      rating: 5,
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};

export const addStatus = async (
  app,
  localJwtToken,
  offerId: string,
  state: string
) => {
  return request(app.getHttpServer())
    .post("/status/" + offerId)
    .send({
      text: "komme morgen",
      state: state,
    })
    .set("Authorization", `Bearer ${localJwtToken}`);
};
