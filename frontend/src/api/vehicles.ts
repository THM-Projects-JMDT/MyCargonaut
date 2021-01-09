import { Car } from "../../../backend/src/car/car";

export const getVehicles = async (): Promise<Car[]> => {
  return new Promise<Car[]>((res, rej) => {});
};

export const addVehicle = async (vehicle: Car): Promise<Car> => {
  return new Promise<Car>((res, rej) => {});
};

export const removeVehicle = async (id: number): Promise<void> => {
  return new Promise<void>((res, rej) => {});
};
