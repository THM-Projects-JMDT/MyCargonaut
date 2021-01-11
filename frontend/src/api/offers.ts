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

export const bookOffer = async (id: number): Promise<OfferResponse> => {
  return fetch(`/api/v1/bookOffer/${id}`, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmIzYWJkOTNhZmYyNDdlOWU5ZjMwOSIsImlhdCI6MTYxMDMwMDg3NCwiZXhwIjoxNjYyMTQwODc0fQ.3E5hF_EBt6TSvcNTkI7SBPeQP7cgjlaGoBPIBdPY6Kc",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse>;
};
