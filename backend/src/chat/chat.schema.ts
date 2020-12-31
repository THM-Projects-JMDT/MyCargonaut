import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { Offer } from "../offer/offer.schema";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Offer" })
  owner: Offer;

  @Prop()
  content: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
