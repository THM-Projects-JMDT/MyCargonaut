import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CarDocument } from "./car.schema";
import { User } from "../users/user";
import { Car } from "./car";

@Injectable()
export class CarService {
  constructor(
    @InjectModel("Car") private readonly carModel: Model<CarDocument>
  ) {}

  async findByUser(user: User) {
    return this.carModel.find({ owner: user });
  }

  async addCar(car: Car) {
    const newCar = new this.carModel(car);
    return newCar.save();
  }

  async updateCar(carID: string, car: Car) {
    return this.carModel.findByIdAndUpdate(carID, car, {
      new: true,
    });
  }
  async deleteCar(carId: string) {
    return this.carModel.findByIdAndRemove(carId);
  }
}
