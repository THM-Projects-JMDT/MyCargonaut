import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Offer } from "../offer/offer.schema";
import * as mongoose from "mongoose";

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Offer" })
  owner: Offer;

  @Prop()
  rating: 0 | 1 | 2 | 3 | 4 | 5;

  @Prop()
  text: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
