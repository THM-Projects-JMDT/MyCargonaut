export interface AddCar {
  manufacturer: string;
  model: string;
  manufactureYear: Date | string;
  seats: number;
  storageSpace: number;
}

export interface Car extends AddCar {
  owner: string;
  manufactureYear: string;
  _id: string;
}
