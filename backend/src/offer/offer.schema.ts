import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "../users/user.schema";

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  createDate: Date;

  @Prop()
  orderDate: Date;

  @Prop({ required: true })
  service: "transport" | "rideShare";

  @Prop({ required: true })
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
