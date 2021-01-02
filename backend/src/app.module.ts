import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { RatingModule } from "./rating/rating.module";
import { OfferModule } from "./offer/offer.module";
import { CarModule } from "./car/car.module";
import { ChatModule } from "./chat/chat.module";
import { StatusModule } from "./status/status.module";
import { UsersModule } from "./users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    CarModule,
    ChatModule,
    OfferModule,
    RatingModule,
    StatusModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get("DATABASE_URI"),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
