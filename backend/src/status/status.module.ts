import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Status, StatusSchema } from "./status.schema";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { OfferService } from "../offer/offer.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Status.name, schema: StatusSchema },
      { name: Offer.name, schema: OfferSchema },
    ]),
  ],
  providers: [StatusService, OfferService],
  controllers: [StatusController],
  exports: [StatusService],
})
export class StatusModule {}
