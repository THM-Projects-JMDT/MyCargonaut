import { User } from "../users/user";
import { State } from "../status/status";

export interface Offer {
  id: number;
  isOffer: boolean;
  from: string;
  to: string;
  date: Date;
  service: string;
  price: number;
  space: number;
  details: string;
  creator: User;
  buyers: User;
  state: State;
}
