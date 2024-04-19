import React from "react";
import styles from "./PriceForm.module.scss";

import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface PriceFormType {
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;
}

export const PriceForm: React.FC<PriceFormType> = ({
  listingObject,
  setListingObject,
}) => {
  return (
    <div className={styles.formStep}>
      <h3 className={styles.formStepTitle}>
        4 шаг: <span className={styles.blue}>Добавление цены</span>
      </h3>
      <p className={styles.formStepInstruction}>
        Укажите стоимость аренды на сутки.
      </p>
      <div className={styles.formGroup}>
        <input
          type="number"
          id="price"
          value={
            listingObject.price_per_day === 0 ? "" : listingObject.price_per_day
          }
          className={styles.formInput}
          placeholder="Цена"
          onChange={(e) => {
            setListingObject({
              ...listingObject,
              price_per_day: Number(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
};
