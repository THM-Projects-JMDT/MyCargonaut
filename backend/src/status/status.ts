import { Offer } from "../offer/offer";

export interface Status {
  offer: Offer;
  state: "Waiting" | "InProgress" | "Delivered";
  text: string;
}
