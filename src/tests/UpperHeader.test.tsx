import { render, screen } from "@testing-library/react";
import { UpperHeader } from "../components/UpperHeader/UpperHeader";
import "@testing-library/jest-dom";

describe("UpperHeader component", () => {
  test("renders correctly", () => {
    render(<UpperHeader />);

    expect(screen.getByText("Главная")).toBeInTheDocument();
    expect(screen.getByText("Объявления на карте")).toBeInTheDocument();
    expect(screen.getByText("Контакты")).toBeInTheDocument();

    expect(screen.getByText("Объявления на карте").nextSibling).toBeInstanceOf(
      HTMLLIElement
    );

    expect(screen.getByText("Вход и регистрация")).toBeInTheDocument();
  });
});
