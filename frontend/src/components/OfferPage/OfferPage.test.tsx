import React from "react";
import { render } from "@testing-library/react";
import { OfferPage } from "./index";

it("has correct tab labels when show offers are displayed", () => {
  const { getByText } = render(<OfferPage show="offers" />);
  expect(getByText("Alle Angebote")).toBeInTheDocument();
  expect(getByText("Meine Angebote")).toBeInTheDocument();
});

it("has correct tab labels when show requests are displayed", () => {
  const { getByText } = render(<OfferPage show="requests" />);
  expect(getByText("Alle Anfragen")).toBeInTheDocument();
  expect(getByText("Meine Anfragen")).toBeInTheDocument();
});

// TODO: more tests
