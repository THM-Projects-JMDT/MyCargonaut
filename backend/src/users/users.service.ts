import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user";
import { UserDocument } from "./user.schema";
import { hash, compare } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserDocument>
  ) {}

  async findOne(username: string) {
    return this.userModel.findOne({ username: username }, { __v: 0 });
  }

  async findOneById(id: string) {
    return this.userModel.findById(id, { __v: 0 });
  }

  async addUser(user: User) {
    user.password = await this.hashPassword(user.password);
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(userId: string, updatedUser) {
    return this.userModel.findByIdAndUpdate(userId, { $set: updatedUser });
  }

  async updateMoney(userId: string, coins: number) {
    return this.userModel.findByIdAndUpdate(userId, {
      $inc: { cargoCoins: coins },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(
    username: string,
    planTextPassword: string
  ): Promise<boolean> {
    const user = await this.userModel.findOne(
      { username: username },
      { password: 1 }
    );

    return user && compare(planTextPassword, user.password);
  }
}
