export interface Offer {
  id: number;
  from: string;
  to: string;
  createDate: Date;
  orderDate: Date;
  service: "transport" | "rideShare";
  price: number;
  seats: number | undefined;
  storageSpace: number | undefined;
  description: string;
  providerId: number | undefined;
  customerId: number | undefined;
}
