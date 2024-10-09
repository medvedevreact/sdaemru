import React, { useEffect, useState } from "react";
import styles from "./OptionsForm.module.scss";

import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface OptionsFormType {
  activeCategoryKey: string;
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;
}

const optionObj = {
  appartments: {
    key: "rooms",
    title: "Комнаты, спальные места",
    subTitle: "Количество комнат",
    array: [
      {
        name: "1-комнатные",
        value: 1,
      },
      {
        name: "2-комнатные",
        value: 2,
      },
      {
        name: "3-комнатные",
        value: 3,
      },
    ],
  },
  houses: {
    key: "size",
    title: "Размеры и габариты",
    subTitle: "Размер коттеджа",
    array: [
      {
        name: "Маленький",
        value: "Small",
      },
      {
        name: "Средний",
        value: "Medium",
      },
      {
        name: "Большой",
        value: "Large",
      },
    ],
  },
  auto: {
    key: "type",
    title: "Кузов автомобиля",
    subTitle: "Тип",

    array: [
      {
        name: "Джипы",
        value: "Crossover",
      },
      {
        name: "Седаны",
        value: "Sedan",
      },
    ],
  },
};

export const OptionsForm: React.FC<OptionsFormType> = ({
  activeCategoryKey,
  listingObject,
  setListingObject,
}) => {
  const category = optionObj[activeCategoryKey as keyof typeof optionObj];
  const [selectedValue, setSelectedValue] = useState(
    listingObject[category.key as keyof typeof listingObject]
  );

  useEffect(() => {
    setSelectedValue(listingObject[category.key as keyof typeof listingObject]);
  }, [listingObject, category.key]);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    setListingObject({
      ...listingObject,
      [category.key]: value,
    });
  };

  return (
    <div className={styles.optionsForm}>
      <h3 className={styles.optionsFormTitle}>
        5 шаг: <span>{category.title}</span>
      </h3>
      <p className={styles.optionsFormSubtitle}>{category.subTitle}</p>
      <div className={styles.optionsFormGroup}>
        {category.array.map((item, index) => (
          <div
            key={index}
            className={`${styles.optionsFormItem} ${
              selectedValue === item.value ? styles.active : ""
            }`}
          >
            <input
              type="radio"
              data-testid={`${index + 1}`}
              name="categoryOption"
              className={styles.optionsFormInput}
              checked={selectedValue === item.value}
              onChange={() => handleRadioChange(item.value as string)}
            />
            <label className={styles.radioLabel}>{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
