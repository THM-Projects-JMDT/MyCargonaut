export type Service = "transport | rideShare";

export interface Offer {
  id: number;
  from: string;
  to: string;
  createDate: Date;
  orderDate: Date;
  service: Service;
  price: number;
  seats: number | undefined;
  storageSpace: number | undefined;
  description: string;
  providerId: number | undefined;
  customerId: number | undefined;
}
