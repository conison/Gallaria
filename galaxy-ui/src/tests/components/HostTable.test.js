import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import HostTable from "../../components/HostTable";

test("displays Preregistration link for NDC and Desktop", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HostTable selectedTab="NDC" />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText("Go to Preregistration")).toBeInTheDocument();
});
