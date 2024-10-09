import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { AppartmentItem } from "../types";
import React from "react";
import { AddListingForms } from "../components/AddListingForm/AddListingForms";

jest.mock("../components/AdressForm/AdressForm", () => ({
  AdressForm: () => <div data-testid="adress-form">AdressForm</div>,
}));

jest.mock("../components/DescForm/DescForm", () => ({
  DescForm: () => <div data-testid="desc-form">DescForm</div>,
}));

jest.mock("../components/PriceForm/PriceForm", () => ({
  PriceForm: () => <div data-testid="price-form">PriceForm</div>,
}));

jest.mock("../components/OptionsForm/OptionsForm", () => ({
  OptionsForm: () => <div data-testid="options-form">OptionsForm</div>,
}));

jest.mock("../components/PhotoForm/PhotoForm", () => ({
  PhotoForm: () => <div data-testid="photo-form">PhotoForm</div>,
}));

const mockListingObject: AppartmentItem = {
  id: "1",
  title: "Тестовое предложение",
  description: "Описание",
  price_per_day: 1000,
  location: "Тестовый город",
  metro: "Тестовое метро",
  district: "Тестовый район",
  rooms: "2 комнаты",
  photo: [],
  owner: {
    name: "Тестовый владелец",
    phone: "123456789",
    email: "test@example.com",
  },
};

describe("AddListingForms", () => {
  const activeCategoryKey = "appartments";
  const listingObject = { ...mockListingObject };
  const setListingObject = jest.fn();
  const fileInputRef = React.createRef<HTMLInputElement>();
  const secondPhotoRef = React.createRef<HTMLInputElement>();
  const thirdPhotoRef = React.createRef<HTMLInputElement>();
  const fourthPhotoRef = React.createRef<HTMLInputElement>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders AdressForm, DescForm, PhotoForm, PriceForm, and OptionsForm", () => {
    render(
      <AddListingForms
        activeCategoryKey={activeCategoryKey}
        listingObject={listingObject}
        setListingObject={setListingObject}
        fileInputRef={fileInputRef}
        secondPhotoRef={secondPhotoRef}
        thirdPhotoRef={thirdPhotoRef}
        fourthPhotoRef={fourthPhotoRef}
      />
    );

    expect(screen.getByTestId("adress-form")).toBeInTheDocument();
    expect(screen.getByTestId("desc-form")).toBeInTheDocument();
    expect(screen.getByTestId("photo-form")).toBeInTheDocument();
    expect(screen.getByTestId("price-form")).toBeInTheDocument();
    expect(screen.getByTestId("options-form")).toBeInTheDocument();
  });
});
