import { render } from "@testing-library/react";
import React from "react";
import { Vehicle } from ".";

const vehicle = {
  manufacturer: "Toyota",
  model: "Estima",
  manufactureYear: 2000,
  seats: 7,
  storageSpace: 400,
};

it("displays correct values", () => {
  const { getByText } = render(
    <Vehicle
      manufacturer={vehicle.manufacturer}
      model={vehicle.model}
      manufactureYear={vehicle.manufactureYear}
      seats={vehicle.seats}
      storageSpace={vehicle.storageSpace}
    />
  );
  expect(getByText(vehicle.manufacturer)).toBeInTheDocument();
  expect(getByText(vehicle.model)).toBeInTheDocument();
  expect(getByText(String(vehicle.manufactureYear))).toBeInTheDocument();
  expect(getByText(String(vehicle.seats))).toBeInTheDocument();
  expect(getByText(String(vehicle.storageSpace) + "l")).toBeInTheDocument();
});
