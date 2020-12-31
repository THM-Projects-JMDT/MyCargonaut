import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Offer } from "../offer/offer.schema";

export type StatusDocument = Status & Document;

@Schema()
export class Status {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Offer" })
  owner: Offer;

  @Prop()
  state: "Waiting" | "InProgress" | "Delivered";

  @Prop()
  text: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
