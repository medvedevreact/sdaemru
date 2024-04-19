import React from "react";
import styles from "./Gallery.module.scss";

import { useNavigate } from "react-router-dom";

const categories = [
  {
    title: "Снять квартиру",
    name: "Квартиры",
    photo: "src/img/appartment.jpg",
    link: "appartments",
  },
  {
    title: "Снять Коттедж",
    name: "Коттеджи",
    photo: "src/img/house.png",
    link: "houses",
  },
  {
    title: "Арендовать авто",
    name: "Авто",
    photo: "src/img/car.jpg",
    link: "auto",
  },
];

export const Gallery = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.section}>
      <div className={styles.wrapper}>
        <ul className={styles.categoryCarts}>
          {categories.map((el) => (
            <li
              className={styles.categoryCart}
              key={el.name}
              style={{ backgroundImage: `url(${el.photo})` }}
            >
              <div className={styles.content}>
                <h3 className={styles.title}>{el.title}</h3>
                <h2 className={styles.name}>{el.name}</h2>
                <div
                  className={styles.svgBorder}
                  onClick={() => {
                    navigate(`/listings/${el.link}`);
                  }}
                >
                  <svg
                    width="15px"
                    height="15px"
                    viewBox="0 0 1024 1024"
                    className={styles.icon}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside>
        <div>
          <h2 className={styles.asideTitle}> Квартиры</h2>
          <ul className={styles.asideList}>
            <li className={styles.asideLi}>Однокомнатные квартиры</li>
            <li className={styles.asideLi}>Двухкомнатные квартиры</li>
            <li className={styles.asideLi}>Трёхкомнатные квартиры</li>
          </ul>
        </div>
        <div>
          <h2 className={styles.asideTitle}>Коттеджи</h2>
          <ul className={styles.asideList}>
            <li className={styles.asideLi}>Малые коттеджи</li>
            <li className={styles.asideLi}>Средние коттеджи</li>
            <li className={styles.asideLi}>Большие коттеджи</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
