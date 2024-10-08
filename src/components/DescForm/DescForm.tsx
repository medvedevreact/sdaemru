import React from "react";
import styles from "./DescForm.module.scss";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface DescFormType {
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;
}

export const DescForm: React.FC<DescFormType> = ({
  listingObject,
  setListingObject,
}) => {
  console.log(listingObject);
  return (
    <div className={styles.formStep}>
      <h3 className={styles.formStepTitle}>
        2 шаг:{" "}
        <span className={styles.blue}>Добавление названия и описания</span>
      </h3>
      <p className={styles.formStepInstruction}>
        Добавьте подробное описание, укажите конкурентные преимущества,
        оказываемые дополнительные услуги и т.д.
      </p>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.formLabel}>
          Название
        </label>
        <input
          type="text"
          id="title"
          className={styles.formInput}
          placeholder="Введите название"
          value={listingObject.title || ""}
          onChange={(e) =>
            setListingObject({
              ...listingObject,
              title: e.target.value,
            })
          }
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.formLabel}>
          Описание
        </label>
        <textarea
          id="description"
          className={styles.formTextarea}
          placeholder="Введите описание"
          value={listingObject.description}
          onChange={(e) =>
            setListingObject({
              ...listingObject,
              description: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
