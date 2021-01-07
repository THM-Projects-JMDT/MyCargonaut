import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Stars } from "./rating";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { OfferService } from "../offer/offer.service";
import { RatingService } from "./rating.service";
import { Offer } from "../offer/offer";

@Controller("rating")
@UseGuards(JwtAuthGuard)
export class RatingController {
  constructor(
    private readonly ratingService: RatingService,
    private readonly offerService: OfferService
  ) {}

  @Get(":offerId")
  async getRatingFromOfferId(
    @Param("offerId") offerId: string,
    @Request() req
  ) {
    const offer: Offer = await this.offerService.getOfferById(offerId);
    return this.ratingService.findByOffer(offer);
  }

  @Post(":offerId")
  async writeRating(
    @Param("offerId") offerId: string,
    @Body("text") text: string | null,
    @Body("rating") rating: Stars | null,
    @Request() req
  ) {
    const offer: Offer = await this.offerService.getOfferById(offerId);
    return this.ratingService.addRating({
      offer: offer,
      rating: rating,
      text: text,
    });
  }
}
