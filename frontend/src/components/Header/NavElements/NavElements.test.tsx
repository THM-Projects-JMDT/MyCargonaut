import React from "react";
import { render } from "@testing-library/react";
import { NavElements } from "./index";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const nav = (
  <BrowserRouter>
    <NavElements />
  </BrowserRouter>
);

it("displays the correct nav elements when logged in", () => {
  // TODO: adjust test when actual login logic is implemented
  /*const { getByText, getByTestId } = render(nav);
  const logInButton = getByText("Login");
  userEvent.click(logInButton); */
});

it("displays the correct nav elements when logged out", () => {
  const { getByText, getByTestId } = render(nav);
  /*const logInButton = getByText("Login");
  userEvent.click(logInButton);*/
  const avatarButton = getByTestId("avatar-icon");
  userEvent.click(avatarButton);
  const logOutButton = getByText("Logout");
  userEvent.click(logOutButton);
  expect(getByText("Login")).toBeInTheDocument();
  expect(getByText("Registrieren")).toBeInTheDocument();
});
