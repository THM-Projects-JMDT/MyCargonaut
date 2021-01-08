import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "../users/user.schema";

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  })
  owner: User;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  manufactureYear: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  storageSpace: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
