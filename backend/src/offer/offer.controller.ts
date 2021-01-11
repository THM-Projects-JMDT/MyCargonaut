import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { Offer, Service } from "./offer";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { OfferService } from "./offer.service";
import { UsersService } from "../users/users.service";
import { RatingService } from "../rating/rating.service";
import { StatusService } from "../status/status.service";

@Controller("offer")
@UseGuards(JwtAuthGuard)
export class OfferController {
  constructor(
    private readonly offerService: OfferService,
    private readonly userService: UsersService,
    private readonly ratingService: RatingService,
    private readonly statusService: StatusService
  ) {}

  @Delete(":offerId")
  async deleteOffer(@Param("offerId") offerId: string, @Request() req) {
    return this.offerService.deleteOffer(offerId);
  }

  @Put(":offerId")
  async editOffer(
    @Param("offerId") offerId: string,
    @Body("from") from: string | null,
    @Body("to") to: string | null,
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
    @Body("orderDate") orderDate: Date | null,
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
      orderDate: orderDate,
      service: service,
      price: price,
      seats: seats,
      storageSpace: storageSpace,
      description: description,
      provider: undefined,
      customer: undefined,
    };
    if (isOffer) {
      newOffer.provider = req.user.id;
    } else {
      newOffer.customer = req.user.id;
    }
    return this.offerService.addOffer(newOffer);
  }

  @Post("bookOffer/:offerId")
  async bookOffer(@Param("offerId") offerId: string, @Request() req) {
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
      newOffer.provider = req.user.id;
      newOffer.customer = oldOffer.customer;
    } else {
      newOffer.customer = req.user.id;
      newOffer.provider = oldOffer.provider;
    }
    await this.statusService.addStatus({
      offer: offerId,
      state: "Waiting",
    });
    return this.offerService.updateOffer(offerId, newOffer);
  }

  @Get()
  async getOffers(@Query() query, @Request() req) {
    let offerList;
    if (query?.forOffer) {
      if (query?.forPrivate) {
        offerList = await this.offerService.findAllOffersByUser(req.user.id);
      } else {
        offerList = await this.offerService.getAllOffers();
      }
    } else {
      if (query?.forPrivate) {
        offerList = await this.offerService.findAllRequestsByUser(req.user.id);
      } else {
        offerList = await this.offerService.getAllRequests();
      }
    }

    for (let i = 0; i < offerList.length; i++) {
      offerList[i] = offerList[i]._doc;

      if (offerList[i].provider != undefined) {
        offerList[i] = await addStars(
          offerList[i],
          this.offerService,
          this.ratingService,
          offerList[i].provider,
          "providerStars"
        );
      }

      if (offerList[i].customer != undefined) {
        offerList[i] = await addStars(
          offerList[i],
          this.offerService,
          this.ratingService,
          offerList[i].customer,
          "customerStars"
        );
      }
      if (
        offerList[i].provider != undefined &&
        offerList[i].customer != undefined
      ) {
        offerList[i] = {
          ...offerList[i],
          tracking: await this.statusService.findByOffer(offerList[i]._id),
        };
      }
    }
    return offerList;
  }
}

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

export const addStars = async (
  offer,
  offerService,
  ratingService,
  user,
  tag
) => {
  const personalOffers = await offerService.findAllOffersByUser(user);
  const starList = [];
  for (let j = 0; j < personalOffers.length; j++) {
    const rating = await ratingService.findByOffer(user);
    if (rating != undefined) {
      starList.push(rating.rating);
    }
  }
  if (starList.length > 0) {
    return { ...offer, [tag]: average(starList) };
  } else {
    return { ...offer, [tag]: undefined };
  }
};
