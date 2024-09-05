import { render, screen } from "@testing-library/react";
import { Tabs } from "../components/Tabs/Tabs";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../store";
import { Listings } from "../pages/Listings";

describe("Tabs component", () => {
  test("renders all categories", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs />
        </BrowserRouter>
      </Provider>
    );

    const categories = ["Квартиры", "Коттеджи", "Авто"];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("changes active category on click", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs />
        </BrowserRouter>
      </Provider>
    );

    const apartmentsTab = screen.getByText("Квартиры");
    const cottagesTab = screen.getByText("Коттеджи");

    expect(apartmentsTab).toHaveClass("active");

    await userEvent.click(cottagesTab);

    expect(cottagesTab).toHaveClass("active");
    expect(apartmentsTab).not.toHaveClass("active");
  });
  test("opens filter dropdown on click and selects filter", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs />
        </BrowserRouter>
      </Provider>
    );

    const popupBtn = screen.getByText("Выберите");

    const filterOption = screen.getByText("1-комн.");
    await userEvent.click(filterOption);

    expect(popupBtn.textContent).toBe("1-комн.");
  });
  test("price input fields should update values correctly", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Tabs />
        </BrowserRouter>
      </Provider>
    );

    const fromPriceInput = screen.getByLabelText("from");
    const toPriceInput = screen.getByLabelText("to");

    await userEvent.type(fromPriceInput, "1000");
    await userEvent.type(toPriceInput, "5000");

    expect(fromPriceInput).toHaveValue("1000");
    expect(toPriceInput).toHaveValue("5000");
  });
  test("show button should navigate to the correct URL", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Tabs />} />
            <Route path="/listings/:category" element={<Listings />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    const showButton = screen.getByText("Показать >");
    await userEvent.click(showButton);

    expect(window.location.pathname).toBe("/listings/appartments");
  });
});
