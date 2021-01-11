import { Stars } from "../../../backend/src/rating/rating";

export interface UserDetails {
  id: string;
  username: string;
  rating?: Stars;
}
