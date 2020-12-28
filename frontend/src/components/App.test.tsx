import React from "react";
import { render } from "@testing-library/react";
import App from "../../src/components/App";

it("renders without crashing", () => {
  render(<App />);
});
