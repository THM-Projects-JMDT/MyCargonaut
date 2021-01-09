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
    @Param("offerId") offerId: string,
    @Request() req
  ) {
    return this.chatService.findByOffer(offerId);
  }

  @Delete(":messageId")
  async deleteMessage(@Param("messageId") messageId: string, @Request() req) {
    return this.chatService.deleteMessage(messageId);
  }

  @Put(":messageId")
  async editMessage(
    @Param("messageId") messageId: string,
    @Body("content") content: string | null,
    @Request() req
  ) {
    await this.chatService.updateMessage(messageId, {
      content: content,
    });
  }

  @Post(":offerId")
  async writeMessage(
    @Param("offerId") offerId: string,
    @Body("content") content: string | null,
    @Request() req
  ) {
    return this.chatService.addMessage({
      offer: offerId,
      content: content,
    });
  }
}
