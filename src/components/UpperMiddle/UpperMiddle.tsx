import { useNavigate } from "react-router-dom";
import styles from "./UpperMiddle.module.scss";

const buttons = ["Мой профиль", "Добавить объявление"];

export const UpperMiddle = () => {
  const navigate = useNavigate();

  const handleButtonClick = (button: string) => {
    if (button === "Добавить объявление") {
      navigate("addListing");
    }
  };

  return (
    <div className={styles.upperMiddle}>
      <ul className={styles.list}>
        {buttons.map((el) => (
          <li key={el} onClick={() => handleButtonClick(el)}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
