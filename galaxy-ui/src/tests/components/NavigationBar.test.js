import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";

test("renders the navigation tabs", () => {
  render(
    <MemoryRouter>
      <NavigationBar />
    </MemoryRouter>
  );

  expect(screen.getByText("Node Info")).toBeInTheDocument();
  expect(screen.getByText("Bulk Action")).toBeInTheDocument();
  expect(screen.getByText("Workflow")).toBeInTheDocument();
});
