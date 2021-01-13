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
    const res = await this.chatModel.find({ offer: offerId }, { __v: 0 });
    console.log(res);
    return this.chatModel.find({ offer: offerId }, { __v: 0 });
  }

  async findById(messageId: string) {
    return this.chatModel.findById(messageId, { __v: 0 });
  }

  async updateMessage(messageId: string, updatedMessage) {
    return this.chatModel.findByIdAndUpdate(messageId, {
      $set: updatedMessage,
    });
  }

  async addMessage(message) {
    const newMessage = new this.chatModel(message);
    return newMessage.save();
  }

  async deleteMessage(messageId) {
    return this.chatModel.findByIdAndRemove(messageId);
  }
}
