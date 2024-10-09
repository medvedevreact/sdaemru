import { screen } from "@testing-library/react";
import { ListingsTitle } from "../components/ListingsTitle/ListingsTitle";
import userEvent from "@testing-library/user-event";
import { setFilter } from "../store/listingsSlice";
import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";

const mockUseAppdispatch = jest.fn();

// Мокирование useAppDispatch
jest.mock("../store", () => ({
  ...jest.requireActual("../store"),
  useAppDispatch: () => mockUseAppdispatch,
}));

test("Компонент рендерится правильно для категории 'appartments'", () => {
  renderWithRouter(<ListingsTitle category="appartments" />);
  expect(screen.getByText("Квартиры")).toBeInTheDocument();
  expect(
    screen.getByText("Аренда квартир на сутки в Москве")
  ).toBeInTheDocument();
});

test("Компонент рендерится правильно для категории 'houses'", () => {
  renderWithRouter(<ListingsTitle category="houses" />);
  expect(screen.getByText("Коттеджи")).toBeInTheDocument();
  expect(
    screen.getByText("Аренда коттеджей на сутки в Москве")
  ).toBeInTheDocument();
});

test("Компонент рендерится правильно для категории 'auto'", () => {
  renderWithRouter(<ListingsTitle category="auto" />);
  expect(screen.getByText("Авто")).toBeInTheDocument();
  expect(screen.getByText("Аренда авто на сутки в Москве")).toBeInTheDocument();
});
test("Клик по кнопке фильтра отправляет правильный экшен для категории 'appartments'", async () => {
  renderWithRouter(<ListingsTitle category="appartments" />);

  await userEvent.click(screen.getByText("1-комнатные"));

  expect(mockUseAppdispatch).toHaveBeenCalledWith(
    setFilter({ key: "rooms", value: "1" })
  );
});
