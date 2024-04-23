import { MdPlace } from "react-icons/md";
import styles from "./UpperHeader.module.scss";

const upperHeaderList = ["Главная", "Объявления на карте", "Контакты"];

export const UpperHeader = () => {
  return (
    <div className={styles.upperHeader}>
      <ul className={styles.list}>
        {upperHeaderList.map((el, index) => (
          <li key={index}>
            {el === "Объявления на карте" ? (
              <>
                {el} <MdPlace />
              </>
            ) : (
              el
            )}
          </li>
        ))}
      </ul>
      <p className={styles.auth}>Вход и регистрация</p>
    </div>
  );
};
