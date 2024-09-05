import { render, screen } from "@testing-library/react";
import { ListingUpper } from "../components/ListingUpper/ListingUpper";

import { AppartmentItem } from "../types";

import "@testing-library/jest-dom";

jest.mock("axios");

const mockListing: AppartmentItem = {
  id: "1",
  title: "Тестовое предложение",
  description: "Описание",
  price_per_day: 1000,
  location: "Тестовый город",
  metro: "Тестовое метро",
  district: "Тестовый район",
  rooms: "2 комнаты",
  photo: ["photo1.jpg", "photo2.jpg"],
  owner: {
    name: "Тестовый владелец",
    phone: "123456789",
    email: "test@example.com",
  },
};

test("рендер компонента с корректными данными", () => {
  render(<ListingUpper listing={mockListing} />);
  const elements = screen.queryAllByText("Тестовое предложение");
  expect(elements.length).toBeGreaterThan(0);
  expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
});
