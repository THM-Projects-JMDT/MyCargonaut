import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from "@nestjs/common";
import {Car} from "./car";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller("car")
@UseGuards(JwtAuthGuard)
export class CarController {

  @Delete(":carId")
  async deleteCar(@Param("carId") carId: number, @Request() req): Promise<{ message: string }> {

    return null
  }

  @Put(":carId")
  async editCar(@Param("carId") carId: number,
                @Body("producer") producer: string | null,
                @Body("model") model: string | null,
                @Body("vintage") vintage: number | null,
                @Body("seat") seat: number | null,
                @Body("space") space: string | null,
                @Request() req
  ): Promise<{ message: string }> {

    return null
  }

  @Post()
  async addCar(@Body("producer") producer: string | null,
               @Body("model") model: string | null,
               @Body("vintage") vintage: number | null,
               @Body("seat") seat: number | null,
               @Body("space") space: number | null,
               @Request() req
  ): Promise<{ message: string }> {

    return null
  }

  @Get()
  async getAllCars(@Request() req): Promise<Car[]> {

    return null
  }
}
