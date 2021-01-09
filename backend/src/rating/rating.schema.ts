import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Offer } from "../offer/offer.schema";
import * as mongoose from "mongoose";

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  offer: string;

  @Prop({ required: true })
  rating: 0 | 1 | 2 | 3 | 4 | 5;

  @Prop()
  text: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
