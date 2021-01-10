export interface UserDetails {
  id: string;
  username: string;
  rating?: number; // TODO: create type for number of stars (0 - 5)
  // TODO: field for profile picture
}
