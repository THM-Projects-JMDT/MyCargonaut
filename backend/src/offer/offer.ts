export type Service = "transport" | "rideShare";

export interface Offer {
  from: string;
  to: string;
  createDate: Date;
  orderDate: Date;
  service: Service;
  price: number;
  seats?: number;
  storageSpace?: number;
  description: string;
  provider?: string;
  customer?: string;
}
