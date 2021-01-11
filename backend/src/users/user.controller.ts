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
    await this.userService.updateUser(req.user.id, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      ppPath: ppPath,
      email: email.trim(),
    });

    return this.userService.findOneById(req.user.id);
  }

  @Post(":moneyAmount")
  async addMoney(@Param("moneyAmount") cargoCoins: string, @Request() req) {
    await this.userService.updateMoney(req.user.id, Number(cargoCoins.trim()));
    return this.userService.findOneById(req.user.id);
  }

  @Get()
  async getUser(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }
}
