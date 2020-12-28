import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from "@nestjs/common";
import {Message} from "./message";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller("chat")
@UseGuards(JwtAuthGuard)
export class ChatController {

  @Get(":offerId")
  async getMessagesFromOfferId(@Param("offerId") offerId: number, @Request() req): Promise<Message[]> {

    return null
  }

  @Delete(":chatId")
  async deleteMessage(@Param("chatId") chatId: number, @Request() req): Promise<{ message: string }> {

    return null
  }

  @Put(":chatId")
  async editMessage(@Param("chatId") chatId: number, @Body("content") content: string | null, @Request() req): Promise<{ message: string }> {

    return null
  }

  @Post(":chatId")
  async writeMessage(@Param("chatId") chatId: number, @Body("content") content: string | null, @Request() req): Promise<{ message: string }> {

    return null
  }


}
