import { Module } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Car, CarSchema } from "./car.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
