import { Offer } from "../../../backend/src/offer/offer";
import { TrackingDetails } from "../model/TrackingDetails";

export interface OfferResponse extends Offer {
  customerRating?: number;
  providerRating?: number;
  trackingDetails?: TrackingDetails;
}

export const getAllOffers = async (): Promise<OfferResponse[]> => {
  return fetch("/api/v1/offer?forOffer=true", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const getAllRequests = async (): Promise<OfferResponse[]> => {
  return fetch("/api/v1/offer", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const getPersonalOffers = async (): Promise<OfferResponse[]> => {
  return fetch("/api/v1/offer?forOffer=true&forPrivate=true", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const getPersonalRequests = async (): Promise<OfferResponse[]> => {
  return fetch("/api/v1/offer?forPrivate=true", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse[]>;
};

export const addOffer = async (offer: Offer): Promise<OfferResponse> => {
  return fetch("/api/v1/addOffer", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
    body: JSON.stringify({ ...offer, isOffer: true }),
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse>;
};

export const addRequest = async (request: Offer): Promise<OfferResponse> => {
  return fetch("/api/v1/addOffer", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<OfferResponse>;
};
