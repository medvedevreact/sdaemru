import { screen, waitFor } from "@testing-library/react";
import { Listing } from "../pages/Listing";
import axios from "axios";
import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";

jest.mock("axios");

const mockListing = {
  id: "1",
  title: "Test Title",
  description: "Test Description",
  price_per_day: 100,
  location: "Test Location",
  metro: "Test Metro",
  district: "Test District",
  rooms: "3",
  photo: ["photo1.jpg", "photo2.jpg"],
  owner: {
    name: "Test Owner",
    phone: "1234567890",
    email: "owner@test.com",
  },
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1", category: "appartments" }),
}));

describe("Listing Component", () => {
  it("fetches and renders the listing data correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockListing });

    renderWithRouter(<Listing />);

    await waitFor(() => {
      expect(screen.getByRole("listing-card")).toBeInTheDocument();
    });
    screen.debug();
  });
});
