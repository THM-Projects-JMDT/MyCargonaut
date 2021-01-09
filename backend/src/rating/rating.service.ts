import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Offer } from "../offer/offer";
import { Rating } from "./rating";
import { RatingDocument } from "./rating.schema";

@Injectable()
export class RatingService {
  constructor(
    @InjectModel("Rating") private readonly ratingModel: Model<RatingDocument>
  ) {}

  async findByOffer(offerId: string) {
    return this.ratingModel.findOne({ offer: offerId }, { __v: 0 });
  }

  async addRating(rating: Rating) {
    const newRating = new this.ratingModel(rating);
    return newRating.save();
  }
}
