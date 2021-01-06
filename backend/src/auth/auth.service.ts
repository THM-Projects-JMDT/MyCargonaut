import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
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

  async login(user: any) {
    const payload = { id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
