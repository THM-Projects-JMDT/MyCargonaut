export interface Status {
  offerId: number;
  state: "Waiting" | "InProgress" | "Delivered";
  text: string;
}
