import { render, screen, waitFor, within } from "@testing-library/react";
import { ListingUpper } from "../components/ListingUpper/ListingUpper";
import { AutoItem } from "../types";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div />,
  Marker: () => <div />,
}));

const mockItem: AutoItem = {
  id: "1",
  title: "Toyota Prius",
  description: "Экономичный гибрид",
  price_per_day: 1500,
  location: "Москва",
  metro: "Таганская",
  district: "Центральный",
  type: "Седан",
  photo: ["car.jpg", "car2.jpg"],
  owner: {
    name: "Иван Иванов",
    phone: "1234567890",
    email: "ivan@example.com",
  },
};

describe("ListingUpper Component", () => {
  test("renders key elements", () => {
    render(<ListingUpper listing={mockItem} />);

    expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
    expect(screen.getByText(/Иван Иванов/i)).toBeInTheDocument();
  });

  test("switches main photo on thumbnail click", async () => {
    render(<ListingUpper listing={mockItem} />);

    const ul = screen.getByRole("list");
    const listItems = within(ul).getAllByRole("listitem");
    expect(listItems[0]).toHaveClass("activePhoto");
    await userEvent.click(listItems[1]);
    expect(listItems[1]).toHaveClass("activePhoto");
    expect(listItems[0]).not.toHaveClass("activePhoto");
  });
  it("fetches and displays map with coordinates", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [{ lat: "55.7558", lon: "37.6176" }],
    });

    render(<ListingUpper listing={mockItem} />);

    await waitFor(() => {
      const maps = screen.getAllByTestId("map");
      maps.forEach((map) => {
        expect(map).toBeInTheDocument();
      });
    });
  });
});
