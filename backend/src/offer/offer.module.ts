import { Module } from "@nestjs/common";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Offer, OfferSchema } from "./offer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
  ],
  providers: [OfferService],
  controllers: [OfferController],
  exports: [OfferService],
})
export class OfferModule {}
