import { Offer } from "../offer/offer";

export type Stars = 0 | 1 | 2 | 3 | 4 | 5;

export interface Rating {
  offer: Offer;
  rating: Stars;
  text: string;
}
