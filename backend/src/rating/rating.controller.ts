import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {Rating} from "./rating";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('rating')
@UseGuards(JwtAuthGuard)
export class RatingController {

  @Get(':offerId')
  async getRatingFromOfferId(@Param('offerId') offerId: number, @Request() req): Promise<Rating> {

    return null
  }

  @Post(':offerId')
  async writeRating(@Param('offerId') offerId: number,
                    @Body('text') text: string | null,
                    @Body('rating') rating: number | null,
                    @Request() req): Promise<{ message: string }> {

    return null
  }
}
