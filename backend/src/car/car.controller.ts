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
import { UsersService } from "../users/users.service";

@Controller("car")
@UseGuards(JwtAuthGuard)
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly userService: UsersService
  ) {}

  @Delete(":carId")
  async deleteCar(@Param("carId") carId: string, @Request() req) {
    return this.carService.deleteCar(carId);
  }

  @Put(":carId")
  async editCar(
    @Param("carId") carId: string,
    @Body("manufacturer") manufacturer: string | null,
    @Body("model") model: string | null,
    @Body("manufactureYear") manufactureYear: number | null,
    @Body("seats") seats: number | null,
    @Body("storageSpace") storageSpace: number | null,
    @Request() req
  ) {
    await this.carService.updateCar(carId, {
      manufacturer: manufacturer,
      model: model,
      manufactureYear: manufactureYear,
      seats: seats,
      storageSpace: storageSpace,
    });
    return this.carService.findByUser(req.user.id);
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
      owner: req.user.id,
      manufacturer: manufacturer,
      model: model,
      manufactureYear: manufactureYear,
      seats: seats,
      storageSpace: storageSpace,
    });
  }

  @Get()
  async getMyCars(@Request() req) {
    return this.carService.findByUser(req.user.id);
  }
}
