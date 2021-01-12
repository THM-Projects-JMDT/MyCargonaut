import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { editFileName, profileImageFileFilter } from "./profileUploadUtils";
import { UsersService } from "./users.service";
import { diskStorage } from "multer";

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

  @Post("addMoney/:moneyAmount")
  async addMoney(@Param("moneyAmount") cargoCoins: string, @Request() req) {
    await this.userService.updateMoney(req.user.id, Number(cargoCoins.trim()));
    return this.userService.findOneById(req.user.id);
  }

  @Get()
  async getUser(@Request() req) {
    return this.userService.findOneById(req.user.id);
  }

  @Post("profile/upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./profile",
        filename: editFileName,
      }),
      limits: { fileSize: 1000000 },
      fileFilter: profileImageFileFilter,
    })
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Get("profile/:uid")
  seeUploadedFile(@Param("uid") image, @Res() res) {
    try {
      return res.sendFile(image, { root: "./profile" });
    } catch {
      throw new HttpException("File not found", HttpStatus.BAD_REQUEST);
    }
  }
}
