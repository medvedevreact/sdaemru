import { render, screen } from "@testing-library/react";
import { PriceForm } from "../components/PriceForm/PriceForm";
import "@testing-library/jest-dom";

const mockListingObject = {
  id: "1",
  title: "Апартаменты в центре",
  description: "Просторные апартаменты в центре города",
  price_per_day: 1200,
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

  test("изменение значений", () => {
    render(
      <PriceForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );
  });
});
