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
    @Body("ppPath") ppPath: string | null,
    @Request() req
  ) {
    const oldUser = await this.userService.findOneById(req.user.id);

    return this.userService.updateUser(req.user.id, {
      password: oldUser.password,
      username: oldUser.username,
      firstName: firstName,
      lastName: lastName,
      cargoCoins: oldUser.cargoCoins,
      birthday: oldUser.birthday,
      ppPath: ppPath,
      email: email,
    });
  }

  @Post(":moneyAmount")
  async addMoney(@Param("moneyAmount") cargoCoins: string, @Request() req) {
    await this.userService.updateMoney(req.user.id, Number(cargoCoins));
    return this.userService.findOneById(req.user.id);
  }

  @Get()
  async getUser(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }
}
