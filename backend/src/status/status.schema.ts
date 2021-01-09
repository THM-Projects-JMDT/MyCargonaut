import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type StatusDocument = Status & Document;

@Schema()
export class Status {
  @Prop({
    required: true,
    index: true,
  })
  offer: string;

  @Prop({ required: true })
  state: "Waiting" | "InProgress" | "Delivered";

  @Prop()
  text: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
