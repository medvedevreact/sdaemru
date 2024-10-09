import { screen, fireEvent } from "@testing-library/react";
import { AddListing } from "../pages/AddListing";
import "@testing-library/jest-dom";
import { renderWithRouter } from "../utils/testing";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
});

const mockUseAppdispatch = jest.fn();
jest.mock("../store", () => ({
  ...jest.requireActual("../store"),
  useAppDispatch: () => mockUseAppdispatch,
}));

describe("addListing page", () => {
  test("renders AddListing component", () => {
    renderWithRouter(<AddListing />);

    expect(
      screen.getByText("Добавление объявления Квартиры")
    ).toBeInTheDocument();
    expect(screen.getByText("Квартиры")).toBeInTheDocument();
    expect(screen.getByText("Коттеджи")).toBeInTheDocument();
    expect(screen.getByText("Авто")).toBeInTheDocument();
  });

  test("changes category when clicking on category item", () => {
    renderWithRouter(<AddListing />);

    fireEvent.click(screen.getByText("Коттеджи"));
    expect(
      screen.getByText("Добавление объявления Коттеджи")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Авто"));
    expect(screen.getByText("Добавление объявления Авто")).toBeInTheDocument();
  });

  test("add obj when required fields are filled", async () => {
    const mockListing = {
      title: "Просторная квартира",
      description: "Очень просторная и светлая квартира",
      price_per_day: "1000",
      location: "ул. Пушкина, дом 12",
      metro: "Проспект Мира",
      district: "Центр",
      rooms: "3",
      photo: ["image1.png", "image2.png", "image3.png", "image4.png"],
      owner: {
        name: "Иван Иванов",
        phone: "1234567890",
        email: "ivanov@example.com",
      },
    };

    renderWithRouter(<AddListing />);

    userEvent.type(
      screen.getByPlaceholderText(/Введите адрес/i),
      mockListing.location
    );
    userEvent.selectOptions(screen.getByRole("select"), mockListing.metro);
    userEvent.type(
      screen.getByPlaceholderText(/Введите название/i),
      mockListing.title
    );
    userEvent.type(
      screen.getByPlaceholderText(/Описание/i),
      mockListing.description
    );

    // Загрузка главной фотографии
    const mainPhotoInput = screen.getByLabelText("Главная фотография");
    const mainPhotoFile = new File(["dummy content"], "mainPhoto.jpg", {
      type: "image/jpeg",
    });
    await userEvent.upload(mainPhotoInput, mainPhotoFile);

    // Загрузка трех дополнительных фотографий
    const additionalPhotoInputs = screen.getAllByRole("additional-photos");
    const additionalPhotoFiles = [
      new File(["dummy content"], "additionalPhoto1.jpg", {
        type: "image/jpeg",
      }),
      new File(["dummy content"], "additionalPhoto2.jpg", {
        type: "image/jpeg",
      }),
      new File(["dummy content"], "additionalPhoto3.jpg", {
        type: "image/jpeg",
      }),
    ];

    for (const additionalPhotoInput of additionalPhotoInputs) {
      const file = additionalPhotoFiles.shift();
      if (file) {
        await userEvent.upload(additionalPhotoInput, file);
      }
    }

    userEvent.type(
      screen.getByPlaceholderText(/Цена/i),
      mockListing.price_per_day
    );

    userEvent.click(screen.getByTestId(/3/i));

    userEvent.click(screen.getByText("Добавить Объявление"));

    expect(screen.getByPlaceholderText(/Введите адрес/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/Введите название/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/Описание/i)).toHaveValue("");

    // expect(mockUseAppdispatch).toHaveBeenCalled();
    // expect(
    //   screen.getByText("Заполните все необходимые поля")
    // ).toBeInTheDocument();
  });

  test("shows error message when required fields are not filled", () => {
    renderWithRouter(<AddListing />);

    fireEvent.click(screen.getByText("Добавить Объявление"));

    expect(
      screen.getByText("Заполните все необходимые поля")
    ).toBeInTheDocument();
  });
});
