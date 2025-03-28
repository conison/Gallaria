import React from "react";
import { render, screen } from "@testing-library/react";
import SystemInfo from "../../components/sidebar/SystemInfo";

test("displays system information", () => {
  render(<SystemInfo />);

  expect(screen.getByText("American Megatrends 2.1")).toBeInTheDocument();
  expect(screen.getByText("Intel UHD Graphics")).toBeInTheDocument();
  expect(screen.getByText("Realtek HD Audio")).toBeInTheDocument();
});
