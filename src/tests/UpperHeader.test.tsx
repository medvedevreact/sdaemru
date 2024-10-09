import { render, screen } from "@testing-library/react";
import { UpperHeader } from "../components/UpperHeader/UpperHeader";
import "@testing-library/jest-dom";

describe("UpperHeader component", () => {
  test("renders correctly", () => {
    render(<UpperHeader />);
    expect(expect(screen.getAllByRole("listitem")).toMatchSnapshot());
  });
});
