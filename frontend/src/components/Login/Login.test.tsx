import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const login = (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);

it("push to the right location after registration", () => {
  const { getByRole } = render(login);

  fireEvent.click(getByRole("button"));
  expect(mockHistoryPush).toHaveBeenCalledWith("/home");
});
