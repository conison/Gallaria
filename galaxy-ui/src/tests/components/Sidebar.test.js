import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../../components/Sidebar";

test("clicking a sidebar item triggers onTabSelect", () => {
  const mockTabSelect = jest.fn();

  render(<Sidebar onTabSelect={mockTabSelect} />);

  fireEvent.click(screen.getByText("Network Info"));
  expect(mockTabSelect).toHaveBeenCalledWith("network");
});
