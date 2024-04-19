import React from "react";
import styles from "./Header.module.scss";

import { Link, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2>
          <span className={styles.black}>SDAEM</span>
          <span className={styles.yellow}>.RU</span>
        </h2>
      </Link>

      <ul className={styles.list}>
        <li className={styles.listItem}>Квартиры</li>
        <li className={styles.listItem}>Коттеджи</li>
        <li className={styles.listItem}>Авто</li>
      </ul>
      <button onClick={() => navigate("/addListing")}>
        {" "}
        + Разместить объявление{" "}
      </button>
    </header>
  );
};
