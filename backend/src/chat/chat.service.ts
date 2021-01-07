import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Offer } from "../offer/offer";
import { ChatDocument } from "./chat.schema";
import { Message } from "./message";
import { OfferDocument } from "../offer/offer.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("Chat") private readonly chatModel: Model<ChatDocument>,
    @InjectModel("Offer") private readonly offerModel: Model<OfferDocument>
  ) {}

  async findByOffer(offerId: string) {
    const offer = await this.offerModel.findById(offerId);
    return this.chatModel.find({ owner: offer });
  }

  async findById(messageId: string) {
    return this.chatModel.findById(messageId);
  }

  async updateMessage(messageId: string, message: Message) {
    return this.chatModel.findByIdAndUpdate(messageId, message, {
      new: true,
    });
  }

  async addMessage(message: Message) {
    const newMessage = new this.chatModel(message);
    return newMessage.save();
  }

  async deleteMessage(messageId) {
    return this.chatModel.findByIdAndRemove(messageId);
  }
}
