import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ChatService } from "./chat.service";
import { Offer } from "../offer/offer";
import { OfferService } from "../offer/offer.service";

@Controller("chat")
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly offerService: OfferService
  ) {}

  @Get(":offerId")
  async getMessagesFromOfferId(
    @Param("offerId") offerId: number,
    @Request() req
  ) {
    return this.chatService.findByOffer(offerId);
  }

  @Delete(":messageId")
  async deleteMessage(@Param("messageId") messageId: number, @Request() req) {
    return this.chatService.deleteMessage(messageId);
  }

  @Put(":messageId")
  async editMessage(
    @Param("messageId") messageId: number,
    @Body("content") content: string | null,
    @Request() req
  ) {
    const oldMessage = await this.chatService.findById(messageId);
    return this.chatService.updateMessage(messageId, {
      offer: oldMessage.offer,
      content: content,
    });
  }

  @Post(":offerId")
  async writeMessage(
    @Param("offerId") offerId: number,
    @Body("content") content: string | null,
    @Request() req
  ) {
    const offer: Offer = await this.offerService.getOfferById(offerId);
    return this.chatService.addMessage({
      offer: offer,
      content: content,
    });
  }
}
