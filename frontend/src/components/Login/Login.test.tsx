import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderWithState, setInputValue } from "../../util/testUtil";
import { Login } from "./index";
import fetchMock from "fetch-mock-jest";

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

it("push to the right location after login", async () => {
  fetchMock.post(
    "/api/v1/auth/login",
    JSON.stringify({
      username: "test",
      firstName: "test",
      lastName: "test",
      cargoCoins: 0,
      birthday: new Date(),
      email: "test@test.de",
    })
  );
  const { getByRole, getByTestId } = renderWithState(login);

  setInputValue(getByTestId, "username", "test");
  setInputValue(getByTestId, "password", "1234");

  fireEvent.click(getByRole("button"));
  await waitFor(() => expect(fetchMock).toHaveFetchedTimes(1));
  expect(mockHistoryPush).toHaveBeenCalledWith("/home");
});
