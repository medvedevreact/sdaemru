import React from "react";
import { ListingsItem } from "../ListingsItem/ListingsItem";
import styles from "./ListingsItems.module.scss";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface ListingsItemsType {
  items: AutoItem[] | HouseItem[] | AppartmentItem[];
}

export const ListingsItems: React.FC<ListingsItemsType> = ({ items }) => {
  return (
    <div className="container">
      <h2 className={styles.title}>Найдено {items.length} результата</h2>
      <ul className={styles.list}>
        {items.map((item: AutoItem | HouseItem | AppartmentItem) => (
          <ListingsItem item={item} />
        ))}
      </ul>
    </div>
  );
};
