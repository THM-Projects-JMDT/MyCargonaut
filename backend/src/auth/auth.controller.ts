import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
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
  async checkLoginStatus(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res({ passthrough: true }) response) {
    response.setHeader(
      "Set-Cookie",
      this.authService.getCookieWithJwtToken(req.user._id)
    );
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(
    @Request() req,
    @Res({ passthrough: true }) response
  ): Promise<{ message: string }> {
    response.setHeader("Set-Cookie", this.authService.getCookieForLogOut());
    return {
      message: "You are logged out",
    };
  }

  @Post("register")
  async addUser(
    @Body("firstName") firstName: string | null,
    @Body("lastName") lastName: string | null,
    @Body("username") username: string | null,
    @Body("birthday") birthday: Date | null,
    @Body("ppPath") ppPath: string | null,
    @Body("email") email: string | null,
    @Body("password") password: string | null
  ) {
    try {
      const user = {
        password: password,
        username: username?.trim(),
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        cargoCoins: 0,
        birthday: birthday,
        ppPath: ppPath?.trim(),
        email: email?.trim(),
      };
      await this.userService.addUser(user);

      delete user.password;
      return user;
    } catch {
      throw new HttpException(
        "Cant register user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
