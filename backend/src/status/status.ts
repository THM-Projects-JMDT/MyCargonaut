export interface Status {
  offerId: number;
  state: State;
  text: string;
}

export enum State {
  Waiting,
  InProgress,
  Delivered,
}
