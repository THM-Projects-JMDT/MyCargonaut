import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Status, StatusSchema } from "./status.schema";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { OfferService } from "../offer/offer.service";
import { User, UserSchema } from "../users/user.schema";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Status.name, schema: StatusSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [StatusService, OfferService, UsersService],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
