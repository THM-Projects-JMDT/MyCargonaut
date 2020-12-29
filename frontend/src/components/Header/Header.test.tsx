import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./index";
import { BrowserRouter } from "react-router-dom";

const header = (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

it("contains the logo with a link to the start page", () => {
  const { getByTestId } = render(header);
  expect(getByTestId("logo").closest("a")).toHaveAttribute("href", "/");
});

// TODO: add tests when routing is implemented
