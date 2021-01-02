import { Offer } from "../offer/offer";

export interface Rating {
  offer: Offer;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  text: string;
}
