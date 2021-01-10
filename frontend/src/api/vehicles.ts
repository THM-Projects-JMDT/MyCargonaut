import { AddCar, Car } from "../model/Car";
import { buildApiUrl, fetchTimeOut } from "./util";

export const getVehicles = async (): Promise<Car[]> => {
  return fetchTimeOut(buildApiUrl("/car"), {
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<Car[]>;
};

export const addVehicle = async (vehicle: AddCar): Promise<Car> => {
  return fetchTimeOut(buildApiUrl("/car"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(vehicle),
  }).then((res) => {
    return res.json();
  }) as Promise<Car>;
};

export const removeVehicle = async (id: string): Promise<void> => {
  return fetchTimeOut(buildApiUrl(`/car/${id}`), {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<void>;
};
