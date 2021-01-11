import React from "react";
import { Vehicle } from ".";
import { renderWithState } from "../../../util/testUtil";

const vehicle = {
  id: "1",
  manufacturer: "Toyota",
  model: "Estima",
  manufactureYear: new Date("2021-01-01T10:20:30Z"),
  seats: 7,
  storageSpace: 400,
};

it("displays correct values", () => {
  const { getByText } = renderWithState(
    <Vehicle
      id={vehicle.id}
      manufacturer={vehicle.manufacturer}
      model={vehicle.model}
      manufactureYear={vehicle.manufactureYear}
      seats={vehicle.seats}
      storageSpace={vehicle.storageSpace}
    />
  );
  expect(getByText(vehicle.manufacturer)).toBeInTheDocument();
  expect(getByText(vehicle.model)).toBeInTheDocument();
  expect(
    getByText(String(vehicle.manufactureYear.getFullYear()))
  ).toBeInTheDocument();
  expect(getByText(String(vehicle.seats))).toBeInTheDocument();
  expect(getByText(String(vehicle.storageSpace) + "l")).toBeInTheDocument();
});
