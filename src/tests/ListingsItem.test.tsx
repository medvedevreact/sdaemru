import { render, screen } from "@testing-library/react";
import { store } from "../store";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ListingsItem } from "../components/ListingsItem/ListingsItem";
import { AutoItem } from "../types";

const item: AutoItem = {
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
};

describe("listing item", () => {
  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ListingsItem item={item} />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByText("Мощный внедорожник для любой местности")
    ).toBeInTheDocument();
  });
});
