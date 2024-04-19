import styles from "./UpperMiddle.module.scss";

const buttons = ["Мой профиль", "Добавить объявление"];

export const UpperMiddle = () => {
  return (
    <div className={styles.upperMiddle}>
      <ul className={styles.list}>
        {buttons.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </div>
  );
};
