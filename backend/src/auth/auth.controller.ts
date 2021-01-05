import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("login")
  async checkLoginStatus(@Request() req): Promise<{ message: string }> {
    return {
      message: "You are already logged in",
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req): Promise<{ message: string }> {
    req.user = null;
    return {
      message: "You are logged out",
    };
  }

  @Post("registry")
  async addUser(
    @Body("firstName") firstName: string | null,
    @Body("lastName") lastName: string | null,
    @Body("username") username: string | null,
    @Body("birthday") birthday: Date | null,
    @Body("ppPath") ppPath: string | null,
    @Body("email") email: string | null,
    @Body("password") password: string | null,
    @Request() req
  ) {
    return this.userService.addUser({
      password: password,
      username: username,
      firstName: firstName,
      lastName: lastName,
      cargoCoins: 0,
      birthday: birthday,
      ppPath: ppPath,
      email: email,
    });
  }
}
