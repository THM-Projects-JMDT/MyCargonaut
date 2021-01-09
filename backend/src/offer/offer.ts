import { User } from "../users/user";

export type Service = "transport" | "rideShare";

export interface Offer {
  from: string;
  to: string;
  createDate: Date;
  orderDate: Date;
  service: Service;
  price: number;
  seats: number | undefined;
  storageSpace: number | undefined;
  description: string;
  provider: string | undefined;
  customer: string | undefined;
}
