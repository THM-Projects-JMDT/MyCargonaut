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
import { OfferService } from "../offer/offer.service";
import { StatusService } from "./status.service";
import { Offer } from "../offer/offer";

@Controller("status")
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(
    private readonly statusService: StatusService,
    private readonly offerService: OfferService
  ) {}

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
    const offer: Offer = await this.offerService.getOfferById(offerId);
    return this.statusService.addStatus({
      offer: offer,
      state: state,
      text: text,
    });
  }
}
