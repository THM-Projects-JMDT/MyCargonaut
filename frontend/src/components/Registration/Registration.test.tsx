import React from "react";
import { fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Registration } from "./index";
import { renderWithState, setInputValue } from "../../util/testUtil";
import fetchMock from "fetch-mock-jest";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const registration = (
  <BrowserRouter>
    <Registration />
  </BrowserRouter>
);

it("push to the right location after registration", async () => {
  fetchMock.post("/api/v1/auth/register", "ok");
  const { getByText, getByTestId } = renderWithState(registration);

  setInputValue(getByTestId, "firstname", "Test");
  setInputValue(getByTestId, "lastname", "Test");
  setInputValue(getByTestId, "birthday", "05.02.2020");
  setInputValue(getByTestId, "username", "test");
  setInputValue(getByTestId, "email", "test@test.de");
  setInputValue(getByTestId, "password", "1234");
  setInputValue(getByTestId, "repeat-password", "1234");

  fireEvent.click(getByText("REGISTRIEREN"));
  await waitFor(() => expect(fetchMock).toHaveFetchedTimes(1));
  expect(mockHistoryPush).toHaveBeenCalledWith("/login");
});
