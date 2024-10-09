import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AdressForm } from "../components/AdressForm/AdressForm";
import axios from "axios";
import { AutoItem } from "../types";
import "@testing-library/jest-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockSetListingObject = jest.fn();

const mockListingObject: AutoItem = {
  id: "1",
  title: "Test Auto",
  description: "Test Description",
  price_per_day: 1000,
  location: "Test Location",
  metro: "Test Metro",
  district: "Test District",
  type: "auto",
  photo: ["test-photo-url"],
  owner: {
    name: "John Doe",
    phone: "1234567890",
    email: "john@example.com",
  },
};

describe("AdressForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input field for address", () => {
    render(
      <AdressForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const addressInput = screen.getByPlaceholderText(/Введите адрес/i);
    expect(addressInput).toBeInTheDocument();
  });

  test("makes a backend request and displays address suggestions", async () => {
    const mockSuggestions = [{ display_name: "Москва" }];

    mockedAxios.get.mockResolvedValueOnce({ data: mockSuggestions });

    render(
      <AdressForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const addressInput = screen.getByPlaceholderText(/Введите адрес/i);
    fireEvent.change(addressInput, { target: { value: "Москва" } });

    await waitFor(
      () => {
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith(
          "https://nominatim.openstreetmap.org/search",
          expect.objectContaining({
            params: expect.objectContaining({
              format: "json",
              q: "Москва",
            }),
          })
        );
      },
      { timeout: 1500 }
    );
  });
  test("selects a metro station", () => {
    render(
      <AdressForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const metroSelect = screen.getByRole("select");
    fireEvent.change(metroSelect, { target: { value: "Авиамоторная" } });

    expect(mockSetListingObject).toHaveBeenCalledWith({
      ...mockListingObject,
      metro: "Авиамоторная",
    });
  });
  test("selects an address from suggestions", async () => {
    const mockSuggestions = [
      { display_name: "Москва, Центральный федеральный округ, Россия" },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockSuggestions });

    render(
      <AdressForm
        listingObject={mockListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const addressInput = screen.getByPlaceholderText(/Введите адрес/i);
    fireEvent.change(addressInput, { target: { value: "Москва" } });

    const suggestion = await waitFor(
      () => screen.getByText(/Москва, Центральный федеральный округ, Россия/i),
      { timeout: 1500 }
    );
    fireEvent.click(suggestion);

    expect(mockSetListingObject).toHaveBeenCalledWith({
      ...mockListingObject,
      location: "Москва, Центральный федеральный округ, Россия",
    });
  });
});
