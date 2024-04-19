import { MdPlace } from "react-icons/md";
import styles from "./UpperHeader.module.scss";
import { Link } from "react-router-dom";

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
      <Link to="/">Вход и регистрация</Link>
    </div>
  );
};
