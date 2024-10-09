import { screen } from "@testing-library/react";
import { renderWithRouter } from "./utils/testing";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("./pages/Home", () => ({
  Home: () => <div>Home Page</div>,
}));

jest.mock("./pages/Listings", () => ({
  Listings: () => <div>Listings Page</div>,
}));

jest.mock("./pages/Listing", () => ({
  Listing: () => <div>Listing Page</div>,
}));

jest.mock("./pages/AddListing", () => ({
  AddListing: () => <div>Add Listing Page</div>,
}));

describe("App routing", () => {
  it("renders the Home page on the root route", () => {
    renderWithRouter(<App />, { initialEntries: ["/"] });
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  it("renders the Listings page on the /listings/:category route", () => {
    renderWithRouter(<App />, { initialEntries: ["/listings/cars"] });
    expect(screen.getByText(/Listings Page/i)).toBeInTheDocument();
  });

  it("renders the Listing page on the /listings/:category/:id route", () => {
    renderWithRouter(<App />, { initialEntries: ["/listings/cars/123"] });
    expect(screen.getByText(/Listing Page/i)).toBeInTheDocument();
  });

  it("renders the AddListing page on the /addListing route", () => {
    renderWithRouter(<App />, { initialEntries: ["/addListing"] });
    expect(screen.getByText(/Add Listing Page/i)).toBeInTheDocument();
  });
});
