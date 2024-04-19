import React from "react";
import styles from "./Search.module.scss";
import { Tabs } from "../Tabs/Tabs";

export const Search = () => {
  return (
    <div className={styles.searchWrapper}>
      <h2 className={styles.title}>
        Sdaem.ru - у нас живут <span>ваши объявления</span>
      </h2>
      <Tabs />
    </div>
  );
};
