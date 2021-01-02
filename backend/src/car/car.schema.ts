import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "../users/user.schema";

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: User;

  @Prop()
  manufacturer: string;

  @Prop()
  model: string;

  @Prop()
  manufactureYear: number;

  @Prop()
  seats: number;

  @Prop()
  storageSpace: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
