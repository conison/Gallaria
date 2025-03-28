import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NetworkInfo from "../../components/sidebar/NetworkInfo";

const mockStore = configureStore([]);

test("displays network info correctly", () => {
  const store = mockStore({
    network: { networkDetails: [{ dnsSuffix: "example.com", ip: "192.168.1.1" }], loading: false }
  });

  render(
    <Provider store={store}>
      <NetworkInfo />
    </Provider>
  );

  expect(screen.getByText("example.com")).toBeInTheDocument();
  expect(screen.getByText("192.168.1.1")).toBeInTheDocument();
});
