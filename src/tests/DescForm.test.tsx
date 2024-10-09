import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DescForm } from "../components/DescForm/DescForm";
import { AutoItem } from "../types";
import "@testing-library/jest-dom";

describe("DescForm", () => {
  const mockSetListingObject = jest.fn();
  const initialListingObject: AutoItem = {
    id: "1",
    title: "Initial title",
    description: "Initial description",
    price_per_day: 100,
    location: "Location",
    metro: "Metro",
    district: "District",
    type: "Car",
    photo: ["photo.jpg"],
    owner: {
      name: "Owner",
      phone: "123456789",
      email: "owner@example.com",
    },
  };

  beforeEach(() => {
    mockSetListingObject.mockClear();
  });

  it("renders form with correct initial values", () => {
    render(
      <DescForm
        listingObject={initialListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    expect(screen.getByLabelText("Название")).toHaveValue(
      initialListingObject.title
    );
    expect(screen.getByLabelText("Описание")).toHaveValue(
      initialListingObject.description
    );
  });

  it("updates title on input change", async () => {
    render(
      <DescForm
        listingObject={initialListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const titleInput = screen.getByLabelText("Название");
    const newTitle = "Updated title";

    fireEvent.change(titleInput, { target: { value: "" } });

    fireEvent.change(titleInput, { target: { value: newTitle } });

    await waitFor(() =>
      expect(mockSetListingObject).toHaveBeenLastCalledWith({
        ...initialListingObject,
        title: newTitle,
      })
    );
  });

  it("updates description on textarea change", async () => {
    render(
      <DescForm
        listingObject={initialListingObject}
        setListingObject={mockSetListingObject}
      />
    );

    const descriptionTextarea = screen.getByLabelText("Описание");
    const newDescription = "Updated description";

    fireEvent.change(descriptionTextarea, { target: { value: "" } });

    fireEvent.change(descriptionTextarea, {
      target: { value: newDescription },
    });

    await waitFor(() =>
      expect(mockSetListingObject).toHaveBeenLastCalledWith({
        ...initialListingObject,
        description: newDescription,
      })
    );
  });
});
