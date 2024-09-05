import { render, screen } from "@testing-library/react";
import { ListingsItems } from "../components/ListingsItems/ListingsItems";
import { AutoItem } from "../types";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const items: AutoItem[] = [
  {
    id: "1",
    title: "Джип",
    description: "Мощный внедорожник для любой местности",
    price_per_day: 3000,
    location: "Москва",
    metro: "Киевская",
    district: "Центральный",
    type: "Crossover",
    photo: ["photo1.jpg"],
    owner: {
      name: "Иван Иванов",
      phone: "+7 999 999 99 99",
      email: "ivanov@example.com",
    },
  },
  {
    id: "2",
    title: "Седан",
    description: "Комфортный городской автомобиль",
    price_per_day: 2000,
    location: "Москва",
    metro: "Белорусская",
    district: "Центральный",
    type: "Sedan",
    photo: ["photo2.jpg"],
    owner: {
      name: "Петр Петров",
      phone: "+7 888 888 88 88",
      email: "petrov@example.com",
    },
  },
];

test("Компонент рендерится правильно и отображает правильное количество результатов", () => {
  render(
    <BrowserRouter>
      <ListingsItems items={items} />
    </BrowserRouter>
  );
  expect(screen.getByText("Найдено 2 результата")).toBeInTheDocument();
});

test("Компонент рендерит правильное количество элементов", () => {
  render(
    <BrowserRouter>
      <ListingsItems items={items} />
    </BrowserRouter>
  );
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
});
