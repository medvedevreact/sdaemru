import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UpperMiddle } from "../components/UpperMiddle/UpperMiddle";
import "@testing-library/jest-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddListing } from "../pages/AddListing";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("upper middle component", () => {
  test("render", () => {
    render(
      <BrowserRouter>
        <UpperMiddle />
      </BrowserRouter>
    );
    expect(screen.getByText("Мой профиль")).toBeInTheDocument();
    expect(screen.getByText("Добавить объявление")).toBeInTheDocument();
  });
  test("navigate to other page", async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UpperMiddle />} />
          <Route path="/addListing" element={<AddListing />} />
        </Routes>
      </BrowserRouter>
    );
    const button = screen.getByText("Добавить объявление");
    await userEvent.click(button);
    expect(mockedUseNavigate).toHaveBeenCalledWith("/addListing");
  });
});
