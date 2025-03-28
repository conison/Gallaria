import React from "react";
import { render, screen } from "@testing-library/react";
import PeripheralInfo from "../../components/sidebar/PeripheralInfo";

test("displays peripheral device information", () => {
  render(<PeripheralInfo />);

  expect(screen.getByText("Dell Monitor")).toBeInTheDocument();
  expect(screen.getByText("1920x1080")).toBeInTheDocument();
  expect(screen.getByText("Primary")).toBeInTheDocument();
});
