import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProcessesInfo from "../../components/sidebar/ProcessesInfo";
import { removeProcess } from "../../store/slice/processSlice";

const mockStore = configureStore([]);

test("displays process information and allows killing a process", () => {
  const store = mockStore({
    processes: {
      processes: [{ name: "chrome.exe", processId: 1234, memory: "200MB" }],
      loading: false
    }
  });

  store.dispatch = jest.fn();

  render(
    <Provider store={store}>
      <ProcessesInfo />
    </Provider>
  );

  expect(screen.getByText("chrome.exe")).toBeInTheDocument();
  expect(screen.getByText("200MB")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Kill"));

  expect(store.dispatch).toHaveBeenCalledWith(removeProcess(1234));
});
