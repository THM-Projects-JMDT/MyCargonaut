import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatusDocument } from "./status.schema";
import { Offer } from "../offer/offer";
import { Status } from "./status";
import { OfferDocument } from "../offer/offer.schema";

@Injectable()
export class StatusService {
  constructor(
    @InjectModel("Status") private readonly statusModel: Model<StatusDocument>,
    @InjectModel("Offer") private readonly offerModel: Model<OfferDocument>
  ) {}

  async findByOffer(offerId: string) {
    return this.statusModel.findOne({ offer: offerId }, { __v: 0 });
  }
  async deleteStatus(statusId) {
    return this.statusModel.findByIdAndRemove(statusId);
  }

  async addStatus(status) {
    const newStatus = new this.statusModel(status);
    return newStatus.save();
  }
}
