import { State } from "../../../backend/src/status/status";

export interface TrackingDetails {
  state: State;
  text?: string;
}
