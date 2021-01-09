import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Offer } from "../offer/offer";
import { ChatDocument } from "./chat.schema";
import { Message } from "./message";
import { OfferDocument } from "../offer/offer.schema";
const ObjectId = require("mongoose").Types.ObjectId;

@Injectable()
export class ChatService {
  constructor(
    @InjectModel("Chat") private readonly chatModel: Model<ChatDocument>,
    @InjectModel("Offer") private readonly offerModel: Model<OfferDocument>
  ) {}

  async findByOffer(offerId: string) {
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

  async addMessage(message: Message) {
    const newMessage = new this.chatModel(message);
    return newMessage.save();
  }

  async deleteMessage(messageId) {
    return this.chatModel.findByIdAndRemove(messageId);
  }
}
