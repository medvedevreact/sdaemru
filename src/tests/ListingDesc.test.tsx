import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import { ListingDesc } from "../components/ListingDesc/ListingDesc";
import { AutoItem } from "../types";
import { screen } from "@testing-library/react";

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

describe("desc component", () => {
  test("render", () => {
    renderWithRouter(<ListingDesc listing={mockItem} />);
    expect(screen.getByRole("desc")).toMatchSnapshot();
  });
});
