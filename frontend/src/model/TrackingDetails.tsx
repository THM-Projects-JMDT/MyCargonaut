export interface TrackingDetails {
  state: string; // TODO: use 'TrackingState" type
  lastMessage?: string;
  lastMessageDate?: Date;
}
