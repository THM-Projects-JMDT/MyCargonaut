import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  ppPath: string;

  @Prop()
  birthday: Date;

  @Prop()
  cargoCoins: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
