import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import { screen } from "@testing-library/react";
import { Header } from "../components/Header/Header";

describe("desc component", () => {
  test("render", () => {
    renderWithRouter(<Header />);
    expect(screen.getAllByRole("listitem")).toHaveLength(6);
  });
});
