import { render, screen } from "@testing-library/react";
import { PhotoForm } from "../components/PhotoForm/PhotoForm";
import { AppartmentItem } from "../types";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
});

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

const mockSetListingObject = jest.fn();

test("рендер компонента без ошибок", () => {
  render(
    <PhotoForm
      listingObject={mockListingObject}
      setListingObject={mockSetListingObject}
      fileInputRef={null}
      secondPhotoRef={null}
      thirdPhotoRef={null}
      fourthPhotoRef={null}
    />
  );

  expect(screen.getByText(/Добавьте фотографии/i)).toBeInTheDocument();
});

test("проверка наличия заголовков", () => {
  render(
    <PhotoForm
      listingObject={mockListingObject}
      setListingObject={mockSetListingObject}
      fileInputRef={null}
      secondPhotoRef={null}
      thirdPhotoRef={null}
      fourthPhotoRef={null}
    />
  );

  expect(screen.getByText(/Главная фотография/i)).toBeInTheDocument();
  expect(screen.getByText(/Дополнительные фотографии/i)).toBeInTheDocument();
});

test("проверка отображения главной фотографии", () => {
  const testPhotoUrl = "http://example.com/photo.jpg";
  render(
    <PhotoForm
      listingObject={{ ...mockListingObject, photo: [testPhotoUrl] }}
      setListingObject={mockSetListingObject}
      fileInputRef={null}
      secondPhotoRef={null}
      thirdPhotoRef={null}
      fourthPhotoRef={null}
    />
  );

  const mainPhoto = screen.getByAltText("Main");
  expect(mainPhoto).toHaveAttribute("src", testPhotoUrl);
});

test("проверка отображения дополнительных фотографий", () => {
  const additionalPhotos = [
    "http://example.com/photo1.jpg",
    "http://example.com/photo2.jpg",
    "http://example.com/photo3.jpg",
  ];
  render(
    <PhotoForm
      listingObject={{
        ...mockListingObject,
        photo: ["mainPhoto.jpg", ...additionalPhotos],
      }}
      setListingObject={mockSetListingObject}
      fileInputRef={null}
      secondPhotoRef={null}
      thirdPhotoRef={null}
      fourthPhotoRef={null}
    />
  );

  additionalPhotos.forEach((url, index) => {
    const additionalPhoto = screen.getByAltText(`Additional ${index + 1}`);
    expect(additionalPhoto).toHaveAttribute("src", url);
  });
});
test("проверка обновления главной фотографии при загрузке", async () => {
  render(
    <PhotoForm
      listingObject={mockListingObject}
      setListingObject={mockSetListingObject}
      fileInputRef={null}
      secondPhotoRef={null}
      thirdPhotoRef={null}
      fourthPhotoRef={null}
    />
  );

  const file = new File(["dummy content"], "example.jpg", {
    type: "image/jpeg",
  });
  const input = screen.getByLabelText("Главная фотография");

  await userEvent.upload(input, file);

  expect(mockSetListingObject).toHaveBeenCalledWith(
    expect.objectContaining({
      photo: expect.arrayContaining([expect.any(String)]),
    })
  );
});
