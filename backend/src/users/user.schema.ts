import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import bcrypt from "bcrypt";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, index: true, unique: true })
  email: string;

  @Prop()
  ppPath: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  cargoCoins: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
