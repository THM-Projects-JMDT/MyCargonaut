import { Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offer.schema";
import { User, UserSchema } from "../users/user.schema";
import { UsersService } from "../users/users.service";
import { Rating, RatingSchema } from "../rating/rating.schema";
import { RatingService } from "../rating/rating.service";
import { StatusService } from "../status/status.service";
import { Status, StatusSchema } from "../status/status.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema },
      { name: User.name, schema: UserSchema },
      { name: Rating.name, schema: RatingSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
  ],
  providers: [OfferService, UsersService, RatingService, StatusService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
