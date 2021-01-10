import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

/*const login = (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);*/

it("push to the right location after login", () => {
  /** TODO
   fetchMock.post(
    "/api/v1/auth/login",
    JSON.stringify({
      username: "test",
      firstName: "test",
      lastName: "test",
      cargoCoins: 0,
      birthday: new Date(),
      ppPath: "",
      email: "test@test.de",
    })
  );
  const { getByRole, getByTestId } = renderWithState(login);

  setInputValue(getByTestId, "username", "test");
  setInputValue(getByTestId, "password", "1234");

  fireEvent.click(getByRole("button"));
  expect(mockHistoryPush).toHaveBeenCalledWith("/home");
  **/
});
