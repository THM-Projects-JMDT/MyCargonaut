import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async getAuthenticatedUser(username: string, pass: string): Promise<any> {
    try {
      const isLogedIn = await this.usersService.comparePassword(username, pass);

      if (!isLogedIn)
        throw new HttpException(
          "Wrong credentials provided",
          HttpStatus.BAD_REQUEST
        );

      return await this.usersService.findOne(username);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private getSecureOptions() {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "staging"
    )
      return " Secure; SameSite=strict;";

    return "";
  }

  public getCookieWithJwtToken(userId: number) {
    const payload = { id: userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      "JWT_EXPIRATION_TIME"
    )};${this.getSecureOptions()}`;
  }

  public getCookieForLogOut() {
    return `Authentication=;HttpOnly; Path=/; Max-Age=0;${this.getSecureOptions()}`;
  }
}
