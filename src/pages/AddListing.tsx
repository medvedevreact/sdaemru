import { useEffect, useRef, useState } from "react";
import { AddListingForms } from "../components/AddListingForm/AddListingForms";

import { AppartmentItem } from "../types";
import { AutoItem } from "../types";
import { HouseItem } from "../types";
import { addListing } from "../store/listingsSlice";
import { useAppDispatch } from "../store";
import CustomButton from "../ui/Button/CustomButton";

type FormFields = {
  appartments: AppartmentItem;
  houses: HouseItem;
  auto: AutoItem;
};
const formFields: FormFields = {
  appartments: {
    title: "",
    description: "",
    price_per_day: 0,
    location: "",
    metro: "",
    district: "",
    rooms: "",
    photo: ["", "", "", ""],
    owner: {
      name: "",
      phone: "",
      email: "",
    },
  },
  houses: {
    title: "",
    description: "",
    price_per_day: 0,
    location: "",
    metro: "",
    district: "",
    size: "",
    photo: ["", "", "", ""],
    owner: {
      name: "",
      phone: "",
      email: "",
    },
  },
  auto: {
    title: "",
    description: "",
    price_per_day: 0,
    location: "",
    metro: "",
    district: "",
    type: "",
    photo: ["", "", "", ""],
    owner: {
      name: "",
      phone: "",
      email: "",
    },
  },
};

const convertNamesObj = {
  appartments: "Квартиры",
  houses: "Коттеджи",
  auto: "Авто",
};

const convertOptions = {
  appartments: "rooms",
  houses: "size",
  auto: "type",
};

export const AddListing = () => {
  const [activeCategory, setActiveCategory] = useState("Квартиры");
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const resetFileInputs = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (secondPhotoRef.current) {
      secondPhotoRef.current.value = "";
    }
    if (thirdPhotoRef.current) {
      thirdPhotoRef.current.value = "";
    }
    if (fourthPhotoRef.current) {
      fourthPhotoRef.current.value = "";
    }
  };
  const secondPhotoRef = useRef<HTMLInputElement | null>(null);
  const thirdPhotoRef = useRef<HTMLInputElement | null>(null);
  const fourthPhotoRef = useRef<HTMLInputElement | null>(null);

  const [showMessage, setShowMessage] = useState(false);

  const activeCategoryKey = Object.keys(convertNamesObj).find(
    (key) =>
      convertNamesObj[key as keyof typeof convertNamesObj] === activeCategory
  ) as keyof typeof formFields;
  const [listingObject, setListingObject] = useState(
    formFields[activeCategoryKey]
  );
  const option = convertOptions[activeCategoryKey];

  const allPhotos = listingObject.photo.every((el) => el !== "");

  const handleClick = () => {
    if (
      listingObject.location !== "" &&
      listingObject.description !== "" &&
      allPhotos &&
      listingObject.price_per_day !== 0 &&
      option &&
      listingObject[option as keyof typeof listingObject] !== "" &&
      listingObject.metro !== "" &&
      listingObject.title !== ""
    ) {
      dispatch(
        addListing({
          category: activeCategoryKey as string,
          listing: listingObject,
        })
      );
      setListingObject(formFields[activeCategoryKey]);
      resetFileInputs();
    } else {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <div className="container">
      <div className="addListingWrapper">
        <ul className="addListingTitle">
          {Object.entries(convertNamesObj).map(([key, value]) => (
            <li
              key={key}
              onClick={() => {
                setActiveCategory(value);
                setListingObject(formFields[activeCategoryKey]);
              }}
              className={`addListingTitleItem ${
                activeCategory === value ? "active" : ""
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
        <div className="addListingContent">
          <div>
            <h2 className="addListingContentTitle">
              Добавление объявления {activeCategory}
            </h2>
            <p className="addListingContentText">
              1. Введите адрес объекта, который вы собираетесь сдавать в аренду.
              <br></br>
              2. Укажите название и описание.
              <br></br>
              3. Добавьте фотографии.
              <br></br>
              4. Укажите цену.
              <br></br>
              5. Укажите дополнительные характеристики объекта в указанных
              полях.
            </p>
          </div>
          <div>
            <AddListingForms
              fileInputRef={fileInputRef}
              activeCategoryKey={activeCategoryKey}
              listingObject={listingObject}
              setListingObject={setListingObject}
              secondPhotoRef={secondPhotoRef}
              thirdPhotoRef={thirdPhotoRef}
              fourthPhotoRef={fourthPhotoRef}
            />

            <CustomButton onClick={handleClick} size={"medium"}>
              Добавить объявление
            </CustomButton>
            {showMessage && (
              <p className="addListingNotCompleted">
                Заполните все необходимые поля
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
