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
import { RatingService } from "./rating.service";

@Controller("rating")
@UseGuards(JwtAuthGuard)
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(":offerId")
  async getRatingFromOfferId(
    @Param("offerId") offerId: string,
    @Request() req
  ) {
    return this.ratingService.findByOffer(offerId?.trim());
  }

  @Post(":offerId")
  async writeRating(
    @Param("offerId") offerId: string,
    @Body("text") text: string | null,
    @Body("rating") rating: Stars | null,
    @Request() req
  ) {
    return this.ratingService.addRating({
      offer: offerId?.trim(),
      rating: rating,
      text: text?.trim(),
    });
  }
}
