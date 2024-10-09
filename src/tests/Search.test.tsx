import { screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Search } from "../components/Search/Search";

import { renderWithRouter } from "../utils/testing";

describe("search component", () => {
  test("renders correctly", () => {
    renderWithRouter(<Search />);

    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
