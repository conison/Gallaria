import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ServicesInfo from "../../components/sidebar/ServicesInfo";
import { toggleServiceStatus } from "../../store/slice/serviceSlice";

const mockStore = configureStore([]);

test("displays service information and allows toggling service", () => {
  const store = mockStore({
    services: {
      services: [{ name: "MySQL", status: "Running", processId: 4567, startupType: "Auto" }],
      loading: false
    }
  });

  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <ServicesInfo />
    </Provider>
  );

  expect(screen.getByText("MySQL")).toBeInTheDocument();
  expect(screen.getByText("Running")).toBeInTheDocument();
  expect(screen.getByText("Auto")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Stop"));

  expect(store.dispatch).toHaveBeenCalledWith(toggleServiceStatus("MySQL"));
});
