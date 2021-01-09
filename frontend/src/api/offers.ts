import { Offer } from "../../../backend/src/offer/offer";
import { TrackingDetails } from "../model/TrackingDetails";

export interface OfferResponse extends Offer {
  customerRating?: number;
  providerRating?: number;
  trackingDetails?: TrackingDetails;
}

export const getAllOffers = async (): Promise<OfferResponse[]> => {
  return new Promise<OfferResponse[]>((res, rej) => {});
};

export const getAllRequests = async (): Promise<OfferResponse[]> => {
  return new Promise<OfferResponse[]>((res, rej) => {});
};

export const getPersonalOffers = async (): Promise<OfferResponse[]> => {
  return new Promise<OfferResponse[]>((res, rej) => {});
};

export const getPersonalRequests = async (): Promise<OfferResponse[]> => {
  return new Promise<OfferResponse[]>((res, rej) => {});
};

export const addOffer = async (offer: Offer): Promise<OfferResponse> => {
  return new Promise<OfferResponse>((res, rej) => {});
};

export const addRequest = async (request: Offer): Promise<OfferResponse> => {
  return new Promise<OfferResponse>((res, rej) => {});
};
