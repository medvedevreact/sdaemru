import { render, screen } from "@testing-library/react";
import { PriceForm } from "../components/PriceForm/PriceForm";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockListingObject = {
  id: "1",
  title: "Апартаменты в центре",
  description: "Просторные апартаменты в центре города",
  price_per_day: 0,
  location: "Центр города",
  metro: "Станция метро",
  district: "Центральный",
  rooms: "2 комнаты",
  photo: ["url1", "url2"],
  owner: {
    name: "Иван Иванов",
    phone: "+123456789",
    email: "ivanov@example.com",
  },
};
const mockSetListingObject = jest.fn();

describe("PriceForm", () => {
  test("рендер компонента без ошибок", () => {
    render(
      <PriceForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    expect(screen.getByText(/Добавление цены/i)).toBeInTheDocument();
  });

  test("проверка наличия заголовка и инструкций", () => {
    render(
      <PriceForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /4 шаг:/i
    );

    expect(
      screen.getByText(/Укажите стоимость аренды на сутки/i)
    ).toBeInTheDocument();
  });

  test("изменение значений", async () => {
    render(
      <PriceForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const input = screen.getByPlaceholderText("Цена");
    await userEvent.type(input, "1500");

    expect(mockSetListingObject).toHaveBeenCalledTimes(4);
  });
});
