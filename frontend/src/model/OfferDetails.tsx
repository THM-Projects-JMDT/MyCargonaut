import { TrackingDetails } from "./TrackingDetails";

export interface OfferDetails {
  id: string;
  from: string;
  to: string;
  service: string; // TODO: use 'Service' type
  date: Date;
  seats?: number;
  storageSpace?: number;
  price: number;
  description: string;
  tracking?: TrackingDetails;
}
