import { Module } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";
import { Rating, RatingSchema } from "./rating.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { OfferService } from "../offer/offer.service";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { User, UserSchema } from "../users/user.schema";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rating.name, schema: RatingSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [RatingService, OfferService, UsersService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
