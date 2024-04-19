import React from "react";
import { FaVk, FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.scss";

const categories = ["Квартиры", "Коттеджи", "Авто"];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <h2 className={styles.logoFooter}>
          <span className={styles.black}>SDAEM</span>
          <span className={styles.yellow}>.RU</span>
        </h2>
        <p className={styles.desc}>
          "© 2024 ООО “Сдаём ру” <br></br> ОГРН 1234567890123, ИНН 1234567890
          <br></br> г. Москва, ул. Примерная, д. 123, офис 456"
        </p>
      </div>
      <ul className={styles.list}>
        {categories.map((el, index) => (
          <li key={index} className={styles.listElem}>
            <h3>{el}</h3>
          </li>
        ))}
      </ul>
      <ul className={styles.listSocial}>
        <li>
          <FaVk size={40} />
        </li>
        <li>
          <FaTelegram size={40} />
        </li>
        <li>
          <FaInstagram size={40} />
        </li>
        <li>
          <FaYoutube size={40} />
        </li>
      </ul>
    </footer>
  );
};
