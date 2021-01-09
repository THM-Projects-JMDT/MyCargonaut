import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { State } from "./status";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { StatusService } from "./status.service";

@Controller("status")
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get(":offerId")
  async getStatusByOfferId(@Param("offerId") offerId: string, @Request() req) {
    return this.statusService.findByOffer(offerId);
  }

  @Post(":offerId")
  async addStatus(
    @Param("offerId") offerId: string,
    @Body("text") text: string | null,
    @Body("state") state: State,
    @Request() req
  ) {
    return this.statusService.addStatus({
      offer: offerId,
      state: state,
      text: text,
    });
  }
}
