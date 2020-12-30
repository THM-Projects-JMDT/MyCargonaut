import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Offer } from "./offer";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("offer")
@UseGuards(JwtAuthGuard)
export class OfferController {
  @Delete(":offerId")
  async deleteOffer(
    @Param("offerId") offerId: number,
    @Request() req
  ): Promise<{ message: string }> {
    return null;
  }

  @Put(":offerId")
  async editOffer(
    @Param("offerId") carId: number,
    @Body("from") from: string | null,
    @Body("to") to: string | null,
    @Body("date") date: Date | null,
    @Body("service") service: string | null,
    @Body("price") price: number | null,
    @Body("space") space: number | null,
    @Body("details") details: string | null,
    @Request() req
  ): Promise<{ message: string }> {
    return null;
  }

  @Post("addOffer")
  async addOffer(
    @Body("isOffer") isOffer: boolean,
    @Body("from") from: string | null,
    @Body("to") to: string | null,
    @Body("date") date: Date | null,
    @Body("service") service: string | null,
    @Body("price") price: number | null,
    @Body("space") space: number | null,
    @Body("details") details: string | null,
    @Request() req
  ): Promise<{ message: string }> {
    return null;
  }

  @Post("bookOffer")
  async bookOffer(
    @Body("offerId") offerId: number,
    @Request() req
  ): Promise<{ message: string }> {
    return null;
  }

  @Get()
  async getOffers(
    @Body("forOffer") forOffer: boolean,
    @Body("forPrivate") forPrivate: boolean,
    @Request() req
  ): Promise<Offer[]> {
    return null;
  }
}
