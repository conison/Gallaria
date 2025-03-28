import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminActions from "../../components/sidebar/AdminActions";

test("renders admin action buttons", () => {
  render(<AdminActions />);

  expect(screen.getByText("View Log File")).toBeInTheDocument();
  expect(screen.getByText("Ping")).toBeInTheDocument();
  expect(screen.getByText("Promote")).toBeInTheDocument();
  expect(screen.getByText("Demise")).toBeInTheDocument();
});
