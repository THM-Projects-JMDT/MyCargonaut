import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Put()
  async editUser(
    @Body("firstName") firstName: string | null,
    @Body("lastName") lastName: string | null,
    @Body("email") email: string | null,
    @Body("password") password: string | null,
    @Body("ppPath") ppPath: string | null,
    @Body("birthday") birthday: Date | null,
    @Request() req
  ) {
    return this.userService.updateUser(req.user.id, {
      password: password,
      username: req.user.username,
      firstName: firstName,
      lastName: lastName,
      cargoCoins: req.user.cargoCoins,
      birthday: birthday,
      ppPath: ppPath,
      email: email,
    });
  }

  @Post("addMoney/:moneyAmount")
  async addMoney(@Param("moneyAmount") cargoCoins: number, @Request() req) {
    return this.userService.updateMoney(req.user._id, cargoCoins);
  }

  @Get()
  async getUser(@Request() req) {
    return req.user;
  }
}
