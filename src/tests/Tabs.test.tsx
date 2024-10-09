import { screen } from "@testing-library/react";
import { Tabs } from "../components/Tabs/Tabs";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "../utils/testing";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

describe("Tabs component", () => {
  test("renders all categories", () => {
    renderWithRouter(<Tabs />);

    const categories = ["Квартиры", "Коттеджи", "Авто"];
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("changes active category on click", async () => {
    renderWithRouter(<Tabs />);

    const apartmentsTab = screen.getByText("Квартиры");
    const cottagesTab = screen.getByText("Коттеджи");

    expect(apartmentsTab).toHaveClass("active");

    await userEvent.click(cottagesTab);

    expect(cottagesTab).toHaveClass("active");
    expect(apartmentsTab).not.toHaveClass("active");
  });
  test("opens filter dropdown on click and selects filter", async () => {
    renderWithRouter(<Tabs />);

    const popupBtn = screen.getByText("Выберите");

    const filterOption = screen.getByText("1-комн.");
    await userEvent.click(filterOption);

    expect(popupBtn.textContent).toBe("1-комн.");
  });
  test("price input fields should update values correctly", async () => {
    renderWithRouter(<Tabs />);

    const fromPriceInput = screen.getByLabelText("from");
    const toPriceInput = screen.getByLabelText("to");

    await userEvent.type(fromPriceInput, "1000");
    await userEvent.type(toPriceInput, "5000");

    expect(fromPriceInput).toHaveValue("1000");
    expect(toPriceInput).toHaveValue("5000");
  });
  test("show button should navigate to the correct URL", async () => {
    const navigateMock = jest.fn();

    useNavigateMock.mockReturnValue(navigateMock);

    renderWithRouter(<Tabs />);

    const showButton = screen.getByText("Показать >");
    await userEvent.click(showButton);

    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
