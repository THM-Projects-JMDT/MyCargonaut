import { User } from "../users/user";

export interface Car {
  owner: string;
  manufacturer: string;
  model: string;
  manufactureYear: number;
  seats: number;
  storageSpace: number;
}
