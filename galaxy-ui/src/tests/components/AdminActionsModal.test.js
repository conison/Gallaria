import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminActionsModal from "../../components/AdminActionsModal";

test("allows selecting an admin action and submitting", () => {
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();

  render(<AdminActionsModal open={true} onClose={handleClose} onSubmit={handleSubmit} />);

  fireEvent.mouseDown(screen.getByText("Select an action:"));
  fireEvent.click(screen.getByText("Promote"));

  fireEvent.click(screen.getByText("Submit"));
  expect(handleSubmit).toHaveBeenCalledWith("promote");
});
