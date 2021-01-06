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
import { Offer, Service } from "./offer";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { OfferService } from "./offer.service";

@Controller("offer")
@UseGuards(JwtAuthGuard)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Delete(":offerId")
  async deleteOffer(@Param("offerId") offerId: number, @Request() req) {
    return this.offerService.deleteOffer(offerId);
  }

  @Put(":offerId")
  async editOffer(
    @Param("offerId") offerId: number,
    @Body("from") from: string | null,
    @Body("to") to: string | null,
    @Body("date") date: Date | null,
    @Body("service") service: Service | null,
    @Body("price") price: number | null,
    @Body("storageSpace") storageSpace: number | null,
    @Body("seats") seats: number | null,
    @Body("description") description: string | null,
    @Request() req
  ) {
    const oldOffer = await this.offerService.getOfferById(offerId);
    const newOffer: Offer = {
      from: from,
      to: to,
      createDate: oldOffer.createDate,
      orderDate: undefined,
      service: service,
      price: price,
      seats: seats,
      storageSpace: storageSpace,
      description: description,
      provider: oldOffer.provider,
      customer: oldOffer.customer,
    };
    return this.offerService.updateOffer(offerId, newOffer);
  }

  @Post("addOffer")
  async addOffer(
    @Body("isOffer") isOffer: boolean,
    @Body("from") from: string | null,
    @Body("to") to: string | null,
    @Body("date") date: Date | null,
    @Body("service") service: Service | null,
    @Body("price") price: number | null,
    @Body("storageSpace") storageSpace: number | null,
    @Body("seats") seats: number | null,
    @Body("description") description: string | null,
    @Request() req
  ) {
    const newOffer: Offer = {
      from: from,
      to: to,
      createDate: new Date(),
      orderDate: undefined,
      service: service,
      price: price,
      seats: seats,
      storageSpace: storageSpace,
      description: description,
      provider: undefined,
      customer: undefined,
    };
    if (isOffer) {
      newOffer.provider = req.user;
    } else {
      newOffer.customer = req.user;
    }
    return this.offerService.addOffer(newOffer);
  }

  @Post("bookOffer")
  async bookOffer(@Body("offerId") offerId: number, @Request() req) {
    const oldOffer = await this.offerService.getOfferById(offerId);
    const newOffer: Offer = {
      from: oldOffer.from,
      to: oldOffer.to,
      createDate: oldOffer.createDate,
      orderDate: new Date(),
      service: oldOffer.service,
      price: oldOffer.price,
      seats: oldOffer.seats,
      storageSpace: oldOffer.storageSpace,
      description: oldOffer.description,
      provider: undefined,
      customer: undefined,
    };
    if (oldOffer.provider == undefined) {
      newOffer.provider = req.user;
      newOffer.customer = oldOffer.customer;
    } else {
      newOffer.customer = req.user;
      newOffer.provider = oldOffer.provider;
    }
    return this.offerService.updateOffer(offerId, newOffer);
  }

  @Get()
  async getOffers(
    @Body("forOffer") forOffer: boolean,
    @Body("forPrivate") forPrivate: boolean,
    @Request() req
  ) {
    if (forOffer == true) {
      if (forPrivate == true) {
        return this.offerService.findAllOffersByUser(req.user.id);
      }
      return this.offerService.getAllOffers();
    }
    if (forPrivate == true) {
      return this.offerService.findAllRequestsByUser(req.user.id);
    }
    return this.offerService.getAllRequests();
  }
}
