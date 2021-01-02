import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserController } from "./user.controller";
import { User, UserSchema } from "./user.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
