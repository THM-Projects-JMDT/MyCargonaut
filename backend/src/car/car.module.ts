import { Module } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Car, CarSchema } from "./car.schema";
import { UsersService } from "../users/users.service";
import { User, UserSchema } from "../users/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CarService, UsersService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
