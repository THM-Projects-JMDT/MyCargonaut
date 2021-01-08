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
    const offer = await this.offerModel.findById(offerId);
    return this.statusModel.find({ offer: offer });
  }

  async addStatus(status: Status) {
    const newStatus = new this.statusModel(status);
    return newStatus.save();
  }
}
