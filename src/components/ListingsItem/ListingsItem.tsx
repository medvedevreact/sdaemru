import React from "react";
import styles from "./ListingsItem.module.scss";
import { MdPlace } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface ListingsItemType {
  item: AutoItem | HouseItem | AppartmentItem;
}

const categoryObject = {
  appartments: "rooms",
  houses: "size",
  auto: "type",
};

export const ListingsItem: React.FC<ListingsItemType> = ({ item }) => {
  const { category } = useParams();
  console.log(category);
  const location = useLocation();
  const navigate = useNavigate();

  const optionKey = categoryObject[category as keyof typeof categoryObject];
  return (
    <div className={styles.item} role="article">
      <img className={styles.img} src={`/${item.photo[0]}`} alt="" />
      <div>
        <div className={styles.content}>
          <div className={styles.contentUpper}>
            <div className={styles.price}>
              <p className={styles.priceMain}>{item.price_per_day}</p>
              <span>за сутки</span>
            </div>

            <p className={styles.rooms}>
              {item[optionKey as keyof typeof item] as string}{" "}
              {String(category) === "appartments" ? "комн." : ""}
            </p>
          </div>
          <p className={styles.location}>
            <MdPlace /> {item.location}
          </p>
          <p className={styles.description}>{item.description}</p>

          <button
            className={styles.moreBtn}
            onClick={() => {
              navigate(`${location.pathname}/${item.id}`);
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};
