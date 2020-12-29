export interface Status {
  offerId: number;
  state: State;
  text: string;
}

export type State = "Waiting" | "InProgress" | "Delivered";
