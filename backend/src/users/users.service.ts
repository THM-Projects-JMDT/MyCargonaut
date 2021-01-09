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

  async updateUser(userId: string, user: User) {
    return this.userModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
  }

  async updateMoney(userId: string, coins: number) {
    return await this.userModel.findByIdAndUpdate(userId, {
      $inc: { cargoCoins: coins },
    });
  }

  async getAll() {
    return await this.userModel.find().exec();
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePassword(
    username: string,
    plantextPassword: string
  ): Promise<boolean> {
    const user = await this.userModel.findOne(
      { username: username },
      { password: 1 }
    );

    return user && compare(plantextPassword, user.password);
  }
}
