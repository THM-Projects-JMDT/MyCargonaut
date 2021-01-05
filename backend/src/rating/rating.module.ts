import { Module } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";
import { Rating, RatingSchema } from "./rating.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
  ],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
