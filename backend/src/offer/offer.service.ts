import { Injectable } from "@nestjs/common";
import { User } from "../users/user";
import { Car } from "../car/car";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OfferDocument } from "./offer.schema";
import { Offer } from "./offer";

@Injectable()
export class OfferService {
  constructor(
    @InjectModel("Offer") private readonly offerModel: Model<OfferDocument>
  ) {}

  async getOfferById(id: string) {
    return this.offerModel.findById(id);
  }

  async findAllOffersByUser(user: User) {
    return this.offerModel.find({ provider: user });
  }

  async findAllRequestsByUser(user: User) {
    return this.offerModel.find({ customer: user });
  }

  async addOffer(offer: Offer) {
    const newOffer = new this.offerModel(offer);
    return newOffer.save();
  }

  async updateOffer(offerId: string, offer: Offer) {
    return this.offerModel.findByIdAndUpdate(offerId, offer, {
      new: true,
    });
  }
  async deleteOffer(offerId) {
    return this.offerModel.findByIdAndRemove(offerId);
  }

  async getAllOffers() {
    return this.offerModel.find({ provider: undefined });
  }

  async getAllRequests() {
    return this.offerModel.find({ customer: undefined });
  }
}
