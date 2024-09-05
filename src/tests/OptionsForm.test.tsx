import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { OptionsForm } from "../components/OptionsForm/OptionsForm";
import { AppartmentItem } from "../types";

const mockAppartmentItem: AppartmentItem = {
  id: "1",
  title: "Тестовое предложение",
  description: "Описание",
  price_per_day: 1000,
  location: "Тестовый город",
  metro: "Тестовое метро",
  district: "Тестовый район",
  rooms: "2 комнаты",
  photo: [],
  owner: {
    name: "Тестовый владелец",
    phone: "123456789",
    email: "test@example.com",
  },
};

const mockSetListingObject = jest.fn();

test("рендер компонента с корректным заголовком и подзаголовком", () => {
  render(
    <OptionsForm
      activeCategoryKey="appartments"
      listingObject={mockAppartmentItem}
      setListingObject={mockSetListingObject}
    />
  );

  expect(screen.getByText(/5 шаг/i)).toBeInTheDocument();
  expect(screen.getByText(/Комнаты, спальные места/i)).toBeInTheDocument();
  expect(screen.getByText(/Количество комнат/i)).toBeInTheDocument();
});

test("отображение радиокнопок на основе активной категории", () => {
  render(
    <OptionsForm
      activeCategoryKey="appartments"
      listingObject={mockAppartmentItem}
      setListingObject={mockSetListingObject}
    />
  );

  const radios = screen.getAllByRole("radio");
  expect(radios.length).toBe(3);
});

test("выбор радиокнопки и обновление состояния", async () => {
  render(
    <OptionsForm
      activeCategoryKey="appartments"
      listingObject={mockAppartmentItem}
      setListingObject={mockSetListingObject}
    />
  );

  const radios = screen.getAllByRole("radio");

  await userEvent.click(radios[1]);

  expect(radios[1]).toBeChecked();
});

test("проверка вызова setListingObject при изменении выбора", async () => {
  render(
    <OptionsForm
      activeCategoryKey="appartments"
      listingObject={mockAppartmentItem}
      setListingObject={mockSetListingObject}
    />
  );

  const radios = screen.getAllByRole("radio");

  await userEvent.click(radios[2]);

  expect(mockSetListingObject).toHaveBeenCalledWith({
    ...mockAppartmentItem,
    rooms: 3,
  });
});
