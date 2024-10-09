import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import { screen } from "@testing-library/react";
import { Footer } from "../components/Footer/Footer";

describe("desc component", () => {
  test("render", () => {
    renderWithRouter(<Footer />);
    expect(screen.getByRole("footer")).toMatchSnapshot();
  });
});
