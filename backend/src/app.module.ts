import {Module} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {RatingModule} from "./rating/rating.module";
import {OfferModule} from "./offer/offer.module";
import {CarModule} from "./car/car.module";
import {ChatModule} from "./chat/chat.module";
import {StatusModule} from "./status/status.module";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [AuthModule, CarModule, ChatModule, OfferModule, RatingModule, StatusModule, UsersModule],
})
export class AppModule {
}
