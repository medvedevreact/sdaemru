import React from "react";
import styles from "./ListingsTitle.module.scss";

import { setFilter } from "../../store/listingsSlice";
import { useAppDispatch } from "../../store";

interface FilterInfo {
  [key: string]: {
    title: string;
    name: string;
    filterBtns: {
      key: "type" | "rooms" | "size";
      array: { name: string; value: string | number }[];
    };
  };
}
const filterInfo: FilterInfo = {
  appartments: {
    title: "Квартиры",
    name: "квартир",
    filterBtns: {
      key: "rooms",
      array: [
        {
          name: "1-комнатные",
          value: 1,
        },
        {
          name: "2-комнатные",
          value: 2,
        },
        {
          name: "3-комнатные",
          value: 3,
        },
      ],
    },
  },
  houses: {
    title: "Коттеджи",
    name: "коттеджей",
    filterBtns: {
      key: "size",
      array: [
        {
          name: "Маленькие",
          value: "Small",
        },
        {
          name: "Средние",
          value: "Medium",
        },
        {
          name: "Большие",
          value: "Large",
        },
      ],
    },
  },
  auto: {
    title: "Авто",
    name: "авто",
    filterBtns: {
      key: "type",
      array: [
        {
          name: "Джипы",
          value: "Crossover",
        },
        {
          name: "Седаны",
          value: "Sedan",
        },
      ],
    },
  },
};

interface ListingsTitleType {
  category: string;
}

export const ListingsTitle: React.FC<ListingsTitleType> = ({ category }) => {
  const dispatch = useAppDispatch();
  const categoryObject = filterInfo[category as keyof typeof filterInfo];

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.upperTitle}>
          <svg
            fill="#0000FF"
            width="12px"
            height="12px"
            viewBox="-9.22 0 122.88 122.88"
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>apartment</title>
            <path d="M3.55,119.32H0v3.56H92.49v-3.56h-2v-17a1.22,1.22,0,0,0-1.22-1.22H75.54a1.22,1.22,0,0,0-1.22,1.22v17H48.47V95.23a1.63,1.63,0,0,0-1.63-1.62H19.94a1.63,1.63,0,0,0-1.63,1.62v24.09H0V2.6A2.79,2.79,0,0,1,.82.85h0a2.84,2.84,0,0,1,2-.84H63.93a2.82,2.82,0,0,1,2,.84l.13.13a2.83,2.83,0,0,1,.72,1.89V34.57H102a2.39,2.39,0,0,1,1.69.7h0a2.36,2.36,0,0,1,.7,1.68v84.29a1.63,1.63,0,0,1-1.63,1.63H92.49v-3.56H101V38H66.79v81.34H63.23V3.56H3.55V119.32Zm84.54,0H76.76V103.5H88.09v15.82ZM85.45,45h8.81c.07,0,.13.1.13.22v5.71c0,.1-.06.21-.13.21H85.45c-.07,0-.13-.09-.13-.21V45.22c0-.12.06-.22.13-.22Zm0,39.6h8.81c.07,0,.13.1.13.21v5.71c0,.11-.06.22-.13.22H85.45c-.07,0-.13-.1-.13-.22V84.81c0-.11.06-.21.13-.21Zm-14.85,0h8.8c.08,0,.14.1.14.21v5.71c0,.11-.06.22-.14.22H70.6c-.08,0-.14-.1-.14-.22V84.81c0-.11.06-.21.14-.21ZM85.45,71.4h8.81c.07,0,.13.1.13.22v5.71c0,.11-.06.22-.13.22H85.45c-.07,0-.13-.1-.13-.22V71.62c0-.13.06-.22.13-.22Zm0-13.2h8.81c.07,0,.13.1.13.22v5.71c0,.11-.06.22-.13.22H85.45c-.07,0-.13-.1-.13-.22V58.42c0-.12.06-.22.13-.22ZM70.6,45h8.8c.08,0,.14.1.14.22v5.71c0,.1-.06.21-.14.21H70.6c-.08,0-.14-.09-.14-.21V45.22c0-.12.06-.22.14-.22Zm0,26.4h8.8c.08,0,.14.1.14.22v5.71c0,.11-.06.22-.14.22H70.6c-.08,0-.14-.1-.14-.22V71.62c0-.13.06-.22.14-.22Zm0-13.2h8.8c.08,0,.14.1.14.22v5.71c0,.11-.06.22-.14.22H70.6c-.08,0-.14-.1-.14-.22V58.42c0-.12.06-.22.14-.22ZM45.21,119.32H21.57V96.86H45.21v22.46ZM12.13,12.52h9.58a.28.28,0,0,1,.27.27v9.59a.28.28,0,0,1-.27.27H12.13a.28.28,0,0,1-.27-.27V12.79a.28.28,0,0,1,.27-.27Zm32.94,0h9.58a.28.28,0,0,1,.27.27v9.59a.28.28,0,0,1-.27.27H45.07a.28.28,0,0,1-.27-.27V12.79a.28.28,0,0,1,.27-.27Zm-16.47,0h9.58a.28.28,0,0,1,.27.27v9.59a.28.28,0,0,1-.27.27H28.6a.28.28,0,0,1-.27-.27V12.79a.28.28,0,0,1,.27-.27ZM12.13,33.28h9.58a.28.28,0,0,1,.27.27v9.59a.28.28,0,0,1-.27.27H12.13a.28.28,0,0,1-.27-.27V33.55a.28.28,0,0,1,.27-.27Zm32.94,0h9.58a.28.28,0,0,1,.27.27v9.59a.28.28,0,0,1-.27.27H45.07a.28.28,0,0,1-.27-.27V33.55a.28.28,0,0,1,.27-.27Zm-16.47,0h9.58a.28.28,0,0,1,.27.27v9.59a.28.28,0,0,1-.27.27H28.6a.28.28,0,0,1-.27-.27V33.55a.28.28,0,0,1,.27-.27ZM12.13,74.8h9.58a.27.27,0,0,1,.27.27v9.58a.27.27,0,0,1-.27.27H12.13a.27.27,0,0,1-.27-.27V75.07a.27.27,0,0,1,.27-.27Zm32.94,0h9.58a.27.27,0,0,1,.27.27v9.58a.27.27,0,0,1-.27.27H45.07a.27.27,0,0,1-.27-.27V75.07a.27.27,0,0,1,.27-.27Zm-16.47,0h9.58a.27.27,0,0,1,.27.27v9.58a.27.27,0,0,1-.27.27H28.6a.27.27,0,0,1-.27-.27V75.07a.27.27,0,0,1,.27-.27ZM12.13,54h9.58a.27.27,0,0,1,.27.27V63.9a.28.28,0,0,1-.27.27H12.13a.28.28,0,0,1-.27-.27V54.31a.27.27,0,0,1,.27-.27Zm32.94,0h9.58a.27.27,0,0,1,.27.27V63.9a.28.28,0,0,1-.27.27H45.07a.28.28,0,0,1-.27-.27V54.31a.27.27,0,0,1,.27-.27ZM28.6,54h9.58a.27.27,0,0,1,.27.27V63.9a.28.28,0,0,1-.27.27H28.6a.28.28,0,0,1-.27-.27V54.31A.27.27,0,0,1,28.6,54Z" />
          </svg>

          <p className={styles.upperTitleP}>{categoryObject.title}</p>
        </div>
        <h2 className={styles.title}>
          Аренда {categoryObject.name} на сутки в Москве
        </h2>
        <p>Рекомендуем посмотреть</p>
        {categoryObject && (
          <div className={styles.filterBtns}>
            {categoryObject.filterBtns.array.map((btn) => (
              <button
                className={styles.filterBtn}
                onClick={() =>
                  dispatch(
                    setFilter({
                      key: categoryObject.filterBtns.key,
                      value: String(btn.value),
                    })
                  )
                }
              >
                {btn.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
