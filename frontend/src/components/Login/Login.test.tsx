import React from "react";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./index";
import { renderWithState } from "../../util/testUtil";

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
  const { getByRole } = renderWithState(login);

  fireEvent.click(getByRole("button"));
  expect(mockHistoryPush).toHaveBeenCalledWith("/home");
});
