import { Slider } from "../components/Slider/Slider";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("slider render", () => {
  const photos = [
    "img/house3img1.jpg",
    "img/house3img2.jpeg",
    "img/house3img3.jpg",
    "img/house3img4.jpg",
  ];

  test("renders correctly with the first photo", () => {
    render(<Slider photo={photos} />);
    const displayedImage = screen.getByRole("img");
    expect(displayedImage).toHaveAttribute("src", "/img/house3img1.jpg");
  });
  test("next btn", async () => {
    render(<Slider photo={photos} />);
    const nextButton = screen.getByRole("button", { name: "next" });
    await userEvent.click(nextButton);
    const displayedImage = screen.getByRole("img");
    expect(displayedImage).toHaveAttribute("src", "/img/house3img2.jpeg");
  });
  test("previous button is initially disabled", () => {
    render(<Slider photo={photos} />);
    const prevButton = screen.getByRole("button", { name: "previous" });
    expect(prevButton).toBeDisabled();
  });
  test("next button is disabled on the last photo", async () => {
    render(<Slider photo={photos} />);

    const nextButton = screen.getByRole("button", { name: "next" });

    for (let i = 0; i < photos.length - 1; i++) {
      await userEvent.click(nextButton);
    }

    expect(nextButton).toBeDisabled();
  });
});
