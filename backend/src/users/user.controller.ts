import {Body, Controller, Get, Param, Post, Put, Request, Session, UseGuards} from '@nestjs/common';
import {User} from "./user";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {


  @Put()
  async editUser(@Body('firstName') firstName: string | null,
                 @Body('lastName') lastName: string | null,
                 @Body('birthday') birthday: Date | null,
                 @Body('picture') picture: string | null,
                 @Body('email') email: string | null,
                 @Body('password') password: string | null,
                 @Request() req
  ): Promise<{ message: string }> {

    return null
  }

  @Post('addMoney/:moneyAmount')
  async addMoney(@Param('moneyAmount') moneyAmount: number, @Request() req): Promise<{ message: string }> {

    return null
  }


  @Get()
  async getUser(@Request() req): Promise<User[]> {

    return null
  }

}
