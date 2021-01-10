import React from "react";
import { Header } from "./index";
import { BrowserRouter } from "react-router-dom";
import { renderWithState } from "../../util/testUtil";

const header = (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
);

it("contains the logo with a link to the start page", () => {
  const { getByTestId } = renderWithState(header);
  expect(getByTestId("logo").closest("a")).toHaveAttribute("href", "/");
});

// TODO: add tests when routing is implemented
