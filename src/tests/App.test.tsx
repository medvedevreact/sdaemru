import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { store } from "../store";
import { Provider } from "react-redux";

jest.mock("../components/Header/Header", () => ({
  Header: () => <div>Mocked Header</div>,
}));

jest.mock("../components/Footer/Footer", () => ({
  Footer: () => <div>Mocked Footer</div>,
}));

describe("App Component", () => {
  test("demo", () => {
    expect(true).toBe(true);
  });

  test("Renders the main page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
    expect(screen.getByText("Mocked Footer")).toBeInTheDocument();
  });

  test("Navigates to AddListing page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/addListing"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавление объявления/i)).toBeInTheDocument();
  });
});
