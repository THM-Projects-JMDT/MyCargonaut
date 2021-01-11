import { Offer } from "../../../backend/src/offer/offer";
import { TrackingDetails } from "../model/TrackingDetails";
import { fetchTimeOut } from "./util";

export interface OfferResponse extends Offer {
  _id: string;
  customerRating?: number;
  providerRating?: number;
  trackingDetails?: TrackingDetails;
}

export const getAllOffers = async (): Promise<OfferResponse[]> => {
  return fetchTimeOut("/api/v1/offer?forOffer=true").then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const getAllRequests = async (): Promise<OfferResponse[]> => {
  return fetchTimeOut("/api/v1/offer").then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const getPersonalOffers = async (): Promise<OfferResponse[]> => {
  return fetchTimeOut("/api/v1/offer?forOffer=true&forPrivate=true").then(
    (res) => {
      return res.json();
    }
  ) as Promise<OfferResponse[]>;
};

export const getPersonalRequests = async (): Promise<OfferResponse[]> => {
  return fetchTimeOut("/api/v1/offer?forPrivate=true").then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const addOffer = async (offer: Offer): Promise<OfferResponse> => {
  return fetchTimeOut("/api/v1/offer/addOffer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...offer, isOffer: true }),
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse>;
};

export const addRequest = async (request: Offer): Promise<OfferResponse> => {
  return fetchTimeOut("/api/v1/offer/addOffer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse>;
};

export const bookOffer = async (id: string): Promise<OfferResponse> => {
  return fetch(`/api/v1/offer/bookOffer/${id}`, {
    method: "POST",
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse>;
};
