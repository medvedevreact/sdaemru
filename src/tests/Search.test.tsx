import { render, screen } from "@testing-library/react";
import { store } from "../store";
import "@testing-library/jest-dom";
import { Search } from "../components/Search/Search";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe("search component", () => {
  test("renders correctly", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
