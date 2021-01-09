import { Injectable } from "@nestjs/common";
import { User } from "../users/user";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OfferDocument } from "./offer.schema";
import { Offer } from "./offer";
const ObjectId = require("mongoose").Types.ObjectId;

@Injectable()
export class OfferService {
  constructor(
    @InjectModel("Offer") private readonly offerModel: Model<OfferDocument>
  ) {}

  async getOfferById(id: string) {
    return this.offerModel.findById(id, { __v: 0 });
  }

  async findAllOffersByUser(userId: string) {
    return this.offerModel.find({ provider: userId }, { __v: 0 });
  }

  async findAllRequestsByUser(userId: string) {
    return this.offerModel.find({ customer: userId }, { __v: 0 });
  }

  async addOffer(offer: Offer) {
    const newOffer = new this.offerModel(offer);
    return newOffer.save();
  }

  async updateOffer(offerId: string, updatedOffer) {
    return this.offerModel.findByIdAndUpdate(offerId, { $set: updatedOffer });
  }
  async deleteOffer(offerId) {
    return this.offerModel.findByIdAndRemove(offerId);
  }

  async getAllOffers() {
    return this.offerModel.find({ customer: undefined }, { __v: 0 });
  }

  async getAllRequests() {
    return this.offerModel.find({ provider: undefined }, { __v: 0 });
  }
}
