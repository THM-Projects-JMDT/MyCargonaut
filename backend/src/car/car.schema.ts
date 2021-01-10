import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CarDocument = Car & Document;

@Schema()
export class Car {
  @Prop({
    required: true,
    index: true,
  })
  owner: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  manufactureYear: Date;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  storageSpace: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
