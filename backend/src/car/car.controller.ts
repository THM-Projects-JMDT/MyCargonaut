import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CarService } from "./car.service";
import { log } from "util";

@Controller("car")
@UseGuards(JwtAuthGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Delete(":carId")
  async deleteCar(@Param("carId") carId: number, @Request() req) {
    return this.carService.deleteCar(carId);
  }

  @Put(":carId")
  async editCar(
    @Param("carId") carId: number,
    @Body("manufacturer") manufacturer: string | null,
    @Body("model") model: string | null,
    @Body("vintage") vintage: number | null,
    @Body("manufactureYear") manufactureYear: number | null,
    @Body("seats") seats: number | null,
    @Body("storageSpace") storageSpace: number | null,
    @Request() req
  ) {
    const car = {
      owner: req.user,
      manufacturer: manufacturer,
      model: model,
      manufactureYear: manufactureYear,
      seats: seats,
      storageSpace: storageSpace,
    };
    return this.carService.updateCar(carId, car);
  }

  @Post()
  async addCar(
    @Body("manufacturer") manufacturer: string | null,
    @Body("model") model: string | null,
    @Body("manufactureYear") manufactureYear: number | null,
    @Body("seats") seats: number | null,
    @Body("storageSpace") storageSpace: number | null,
    @Request() req
  ) {
    return this.carService.addCar({
      owner: req.user,
      manufacturer: manufacturer,
      model: model,
      manufactureYear: manufactureYear,
      seats: seats,
      storageSpace: storageSpace,
    });
  }

  @Get()
  async getAllCars(@Request() req) {
    return this.carService.findByUser(req.user.id);
  }
}
