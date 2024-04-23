import { FaHeart } from "react-icons/fa";
import styles from "./ListingDesc.module.scss";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface ListingDescType {
  listing: AutoItem | HouseItem | AppartmentItem;
}

export const ListingDesc: React.FC<ListingDescType> = ({ listing }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.descUpper}>
        <h2>{listing.title}</h2>
        <div>
          <h2 className={styles.price}>{listing.price_per_day} Р</h2>
          <p>за сутки</p>
        </div>
      </div>
      <p className={styles.desc}>{listing.description}</p>
      <div className={styles.descUnder}>
        <div className={styles.descUnderLeft}>
          <div className={styles.metro}>
            <svg
              fill="#664ef9"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Moscow Metro icon</title>
              <path d="M16.603 11.85l-2.481-6.26-2.092 3.66-2.092-3.66-2.481 6.262H6.74v.941h3.736v-.941h-.553l.538-1.555 1.569 2.57 1.569-2.57.538 1.555h-.553v.941h3.751v-.941zm5.335-1.912A9.933 9.933 0 0 0 12 0C6.516 0 2.062 4.453 2.062 9.938c0 2.75 1.121 5.23 2.914 7.023a.804.804 0 0 0 1.375-.568.825.825 0 0 0-.239-.582 8.303 8.303 0 0 1-2.42-5.873c0-4.588 3.72-8.324 8.308-8.324 4.588 0 8.324 3.736 8.324 8.324a8.289 8.289 0 0 1-2.436 5.888l-7.024 7.023L12 24l7.039-7.039a9.891 9.891 0 0 0 2.899-7.023Z" />
            </svg>
            <p className={styles.metroText}>{listing.metro}</p>
          </div>

          {listing.district && (
            <div className={styles.metro}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#664ef9"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className={styles.metroText}>{listing?.district}</p>
            </div>
          )}
        </div>
        <button className={styles.fav}>
          <FaHeart />В избранное
        </button>
      </div>
    </div>
  );
};
