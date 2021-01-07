import { Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offer.schema";
import { User, UserSchema } from "../users/user.schema";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: OfferSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [OfferService, UsersService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
