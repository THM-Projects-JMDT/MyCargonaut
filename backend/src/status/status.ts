import { Offer } from "../offer/offer";

export type State = "Waiting" | "InProgress" | "Delivered";

export interface Status {
  offer: Offer;
  state: State;
  text: string;
}
