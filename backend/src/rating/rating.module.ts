import { Module } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";
import { Rating, RatingSchema } from "./rating.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { OfferService } from "../offer/offer.service";
import { Offer, OfferSchema } from "../offer/offer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: Offer.name, schema: OfferSchema },
    ]),
  ],
  providers: [RatingService, OfferService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
