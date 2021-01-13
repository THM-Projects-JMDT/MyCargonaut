import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./chat.schema";
import { OfferService } from "../offer/offer.service";
import { Offer, OfferSchema } from "../offer/offer.schema";
import { User, UserSchema } from "../users/user.schema";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ChatService, OfferService, UsersService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
