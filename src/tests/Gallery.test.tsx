import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import { screen } from "@testing-library/react";
import { Gallery } from "../components/Gallery/Gallery";

describe("desc component", () => {
  test("render", () => {
    renderWithRouter(<Gallery />);
    expect(screen.getByRole("gallery")).toMatchSnapshot();
  });
});
