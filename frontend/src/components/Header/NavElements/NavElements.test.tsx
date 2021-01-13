import React from "react";
import { NavElements } from "./index";
import { BrowserRouter } from "react-router-dom";
import { renderWithState } from "../../../util/testUtil";
import { RootStateOrAny } from "react-redux";

const nav = (
  <BrowserRouter>
    <NavElements />
  </BrowserRouter>
);

it("displays the correct nav elements when logged in", () => {
  const initalState: RootStateOrAny = {
    auth: { isLogedIn: true },
  };
  const { getByText } = renderWithState(nav, { initalState });

  expect(getByText("Anfragen")).toBeInTheDocument();
  expect(getByText("Angebote")).toBeInTheDocument();
  expect(getByText("Fahrzeuge")).toBeInTheDocument();
});

it("displays the correct nav elements when logged out", () => {
  const initalState: RootStateOrAny = {
    auth: { isLogedIn: false },
  };
  const { getByText } = renderWithState(nav, { initalState });

  expect(getByText("Login")).toBeInTheDocument();
  expect(getByText("Registrieren")).toBeInTheDocument();
});
