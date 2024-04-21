import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bodyHeight = document.body.scrollHeight;

  return (
    <header>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h2>
          <span className={styles.black}>SDAEM</span>
          <span className={styles.yellow}>.RU</span>
        </h2>
      </Link>

      <ul
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}
        style={{ height: `${bodyHeight - 125}px` }}
      >
        <li className={styles.mobileMenuItem}>Квартиры</li>
        <li className={styles.mobileMenuItem}>Коттеджи</li>
        <li className={styles.mobileMenuItem}>Авто</li>
      </ul>

      <ul className={styles.list}>
        <li className={styles.listItem}>Квартиры</li>
        <li className={styles.listItem}>Коттеджи</li>
        <li className={styles.listItem}>Авто</li>
      </ul>
      <button onClick={() => navigate("/addListing")}>
        + Разместить объявление
      </button>
      <button
        className={styles.burgerMenu}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MdMenu size={24} />
      </button>
    </header>
  );
};
