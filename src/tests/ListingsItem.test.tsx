import { screen } from "@testing-library/react";
import { ListingsItem } from "../components/ListingsItem/ListingsItem";
import { AutoItem } from "../types";
import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

const mockItem: AutoItem = {
  id: "1",
  title: "Toyota Prius",
  description: "Экономичный гибрид",
  price_per_day: 1500,
  location: "Москва",
  metro: "Таганская",
  district: "Центральный",
  type: "Седан",
  photo: ["car.jpg"],
  owner: {
    name: "Иван Иванов",
    phone: "1234567890",
    email: "ivan@example.com",
  },
};

describe("ListingsItem Component", () => {
  it("renders item information correctly", () => {
    renderWithRouter(<ListingsItem item={mockItem} />);

    expect(screen.getByText(/1500/i)).toBeInTheDocument();

    expect(screen.getByText(/Экономичный гибрид/i)).toBeInTheDocument();

    expect(screen.getByText(/Москва/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Подробнее/i })
    ).toBeInTheDocument();
  });

  it("кнопка подробнее", async () => {
    const navigateMock = jest.fn();

    useNavigateMock.mockReturnValue(navigateMock);
    renderWithRouter(<ListingsItem item={mockItem} />);

    const btn = screen.getByText(/Подробнее/i);
    await userEvent.click(btn);
    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
