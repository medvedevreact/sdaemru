import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import { UpperMiddle } from "../components/UpperMiddle/UpperMiddle";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const useNavigateMock = jest.mocked(useNavigate);

describe("upper middle component", () => {
  test("render", () => {
    renderWithRouter(<UpperMiddle />);
    expect(expect(screen.getAllByRole("listitem")).toMatchSnapshot());
  });
  test("navigate to other page", async () => {
    const navigateMock = jest.fn();

    useNavigateMock.mockReturnValue(navigateMock);
    renderWithRouter(<UpperMiddle />);
    const button = screen.getByText(/Добавить объявление/i);
    await userEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
