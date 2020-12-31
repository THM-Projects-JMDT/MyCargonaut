import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";
import { User } from "../users/user.schema";

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  createDate: Date;

  @Prop()
  orderDate: Date;

  @Prop()
  service: "transport" | "rideShare";

  @Prop()
  price: number;

  @Prop()
  seats: number | undefined;

  @Prop()
  storageSpace: number | undefined;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  provider: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  customer: User;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
