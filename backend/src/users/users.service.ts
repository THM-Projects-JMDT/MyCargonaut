import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user";
import { UserDocument } from "./user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserDocument>
  ) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username: username });
  }

  async addUser(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(userId: number, user: User) {
    return this.userModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
  }

  async updateMoney(userId: number, coins: number) {
    const user = await this.userModel.findById(userId);
    user.cargoCoins = user.cargoCoins + coins;
    return this.updateUser(userId, user);
  }

  async getAll() {
    return await this.userModel.find().exec();
  }
}
