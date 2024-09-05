import { render, screen } from "@testing-library/react";
import { ListingsTitle } from "../components/ListingsTitle/ListingsTitle";
import { Provider } from "react-redux";
import { store } from "../store";
import userEvent from "@testing-library/user-event";
import { setFilter } from "../store/listingsSlice";
import "@testing-library/jest-dom";

const dispatch = jest.fn();

// Правильное мокирование useAppDispatch, возвращающее dispatch
jest.mock("../store", () => ({
  ...jest.requireActual("../store"),
  useAppDispatch: () => dispatch,
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

test("Компонент рендерится правильно для категории 'appartments'", () => {
  renderWithProvider(<ListingsTitle category="appartments" />);
  expect(screen.getByText("Квартиры")).toBeInTheDocument();
  expect(
    screen.getByText("Аренда квартир на сутки в Москве")
  ).toBeInTheDocument();
});

test("Компонент рендерится правильно для категории 'houses'", () => {
  renderWithProvider(<ListingsTitle category="houses" />);
  expect(screen.getByText("Коттеджи")).toBeInTheDocument();
  expect(
    screen.getByText("Аренда коттеджей на сутки в Москве")
  ).toBeInTheDocument();
});

test("Компонент рендерится правильно для категории 'auto'", () => {
  renderWithProvider(<ListingsTitle category="auto" />);
  expect(screen.getByText("Авто")).toBeInTheDocument();
  expect(screen.getByText("Аренда авто на сутки в Москве")).toBeInTheDocument();
});
test("Клик по кнопке фильтра отправляет правильный экшен для категории 'appartments'", async () => {
  renderWithProvider(<ListingsTitle category="appartments" />);

  await userEvent.click(screen.getByText("1-комнатные"));

  expect(dispatch).toHaveBeenCalledWith(
    setFilter({ key: "rooms", value: "1" })
  );
});
