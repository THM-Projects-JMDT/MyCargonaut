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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("check")
  async checkLoginStatus(@Request() req): Promise<{ message: string }> {
    return null;
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req): Promise<{ message: string }> {
    return { message: this.authService.login(req.user).toString() };
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  async logout(@Request() req): Promise<{ message: string }> {
    return null;
  }

  @Post("registry")
  async addUser(
    @Body("firstName") firstName: string | null,
    @Body("lastName") lastName: string | null,
    @Body("birthday") birthday: Date | null,
    @Body("picture") picture: string | null,
    @Body("email") email: string | null,
    @Body("password") password: string | null,
    @Request() req
  ): Promise<{ message: string }> {
    return null;
  }
}
