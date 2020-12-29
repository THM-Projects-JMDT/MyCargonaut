import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Status } from "./status";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("status")
@UseGuards(JwtAuthGuard)
export class StatusController {
  @Get(":offerId")
  async getStatusByOfferId(
    @Param("offerId") offerId: number,
    @Request() req
  ): Promise<Status[]> {
    return null;
  }

  @Post(":offerId")
  async addStatus(
    @Param("offerId") offerId: number,
    @Body("text") text: string | null,
    @Body("state") status: Status,
    @Request() req
  ): Promise<{ message: string }> {
    return null;
  }
}
