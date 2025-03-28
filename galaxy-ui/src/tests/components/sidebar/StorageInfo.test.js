import React from "react";
import { render, screen } from "@testing-library/react";
import StorageInfo from "../../components/sidebar/StorageInfo";

test("displays storage information", () => {
  render(<StorageInfo />);

  expect(screen.getByText("Samsung SSD")).toBeInTheDocument();
  expect(screen.getByText("NVMe")).toBeInTheDocument();
  expect(screen.getByText("C:")).toBeInTheDocument();
  expect(screen.getByText("512GB")).toBeInTheDocument();
});
