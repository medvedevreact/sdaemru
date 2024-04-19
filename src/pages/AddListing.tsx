import React, { useEffect, useRef, useState } from "react";
import { AddListingForms } from "../components/AddListingForm/AddListingForms";
import { useDispatch } from "react-redux";
import { addListing } from "../store/listingsSlice";
import { AppartmentItem } from "../types";
import { AutoItem } from "../types";
import { HouseItem } from "../types";
function hasKey<O extends object>(
  obj: O,
  key: keyof string | number | symbol
): key is keyof O {
  return key in obj;
}
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
    photo: "",
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
    photo: "",
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
    photo: "",
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
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const [showMessage, setShowMessage] = useState(false);

  const activeCategoryKey = Object.keys(convertNamesObj).find(
    (key) =>
      convertNamesObj[key as keyof typeof convertNamesObj] === activeCategory
  ) as keyof typeof formFields;
  const [listingObject, setListingObject] = useState(
    formFields[activeCategoryKey]
  );
  const option = convertOptions[activeCategoryKey];

  const handleClick = () => {
    if (
      listingObject.location !== "" &&
      listingObject.description !== "" &&
      listingObject.photo !== "" &&
      listingObject.price_per_day !== 0 &&
      option &&
      hasKey(listingObject, option) &&
      listingObject[option] !== ""
    ) {
      dispatch(
        addListing({
          category: activeCategoryKey as string,
          listing: listingObject,
        })
      );
      setListingObject(formFields[activeCategoryKey]);
      resetFileInput();
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
              2. Укажите описание.
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
            />
            <button className="addListingBtn" onClick={handleClick}>
              Добавить Объявление
            </button>
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
