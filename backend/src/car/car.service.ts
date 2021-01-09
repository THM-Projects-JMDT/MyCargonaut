import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from "mongoose";
import { CarDocument } from "./car.schema";
import { Car } from "./car";
const ObjectId = require("mongoose").Types.ObjectId;

@Injectable()
export class CarService {
  constructor(
    @InjectModel("Car") private readonly carModel: Model<CarDocument>
  ) {}

  async findByUser(userId: string) {
    return this.carModel.find({ owner: userId }, { __v: 0 });
  }

  async addCar(car: Car) {
    const newCar = new this.carModel(car);
    return newCar.save();
  }

  async updateCar(carID: string, carUpdate) {
    return this.carModel.findByIdAndUpdate(carID, { $set: carUpdate });
  }
  async deleteCar(carId: string) {
    return this.carModel.findByIdAndRemove(carId);
  }
}
