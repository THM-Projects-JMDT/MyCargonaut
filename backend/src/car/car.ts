import { User } from "../users/user";

export interface Car {
  id: number;
  owner: User;
  manufacturer: string;
  model: string;
  manufactureYear: number;
  seats: number;
  storageSpace: number;
}
