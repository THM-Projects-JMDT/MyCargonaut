import { TrackingDetails } from "./TrackingDetails";

export interface OfferDetails {
  id: string;
  from: string;
  to: string;
  service: string; // TODO: use 'Service' type
  orderDate: Date;
  seats?: number;
  storageSpace?: number;
  price: number;
  description: string;
  tracking?: TrackingDetails;
}
