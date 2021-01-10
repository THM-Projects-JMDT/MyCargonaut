import { Car } from "../../../backend/src/car/car";

export const getVehicles = async (): Promise<Car[]> => {
  return fetch("/api/v1/car", {
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<Car[]>;
};

export const addVehicle = async (vehicle: Car): Promise<Car> => {
  return fetch("/api/v1/car", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
    body: JSON.stringify(vehicle),
  }).then((res) => {
    return res.json();
  }) as Promise<Car>;
};

export const removeVehicle = async (id: number): Promise<void> => {
  return fetch(`/api/v1/car/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmFlN2M4ZTY2YjE1MWVkMDE4ZjQ2YyIsImlhdCI6MTYxMDI4MTYzMSwiZXhwIjoxNjEwODAwMDMxfQ.pvD8SldGD2_6v1vOuCI_3Fn1AGmlAelnKBn8KQGbxOs",
    },
  }).then((res) => {
    return res.json();
  }) as Promise<void>;
};
