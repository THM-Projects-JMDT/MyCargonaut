import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./chat.schema";
import { OfferService } from "../offer/offer.service";
import { Offer, OfferSchema } from "../offer/offer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Offer.name, schema: OfferSchema },
    ]),
  ],
  providers: [ChatService, OfferService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
