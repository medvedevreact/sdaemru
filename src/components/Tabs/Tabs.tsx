import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import { MdPlace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { setFilter, setPrice } from "../../store/listingsSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const categories = ["Квартиры", "Коттеджи", "Авто"];

const filterCriterias = [
  {
    name: "Квартиры",
    url: "/appartments",
    key: "rooms",
    filterName: "Комнаты",
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
  {
    name: "Коттеджи",
    url: "/houses",
    key: "size",
    filterName: "Размеры",
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

  {
    name: "Авто",
    url: "/auto",
    filterName: "Тип",

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
];

export const Tabs = () => {
  const [activeCategory, setActiveCategory] = useState("Квартиры");
  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const navigate = useNavigate();
  const filter = useAppSelector((state) => state.listings.filter);
  const dispatch = useAppDispatch();
  const activeCategoryObject = filterCriterias.find(
    (category) => category.name === activeCategory
  );

  const handleFilterSelect = (filterName: string) => {
    setSelectedFilter(filterName);
    setIsPopupOpen(false);
  };

  const showBtn = () => {
    if (selectedFilter && activeCategoryObject) {
      const value = activeCategoryObject.array.find(
        (el) => el.name === selectedFilter
      )?.value;

      if (value !== undefined) {
        dispatch(
          setFilter({ key: activeCategoryObject.key, value: String(value) })
        );
      }
    }

    if (fromPrice !== "" && toPrice !== "") {
      dispatch(
        setPrice({ fromPrice: Number(fromPrice), toPrice: Number(toPrice) })
      );
    }

    if (activeCategoryObject) {
      navigate(`/listings${activeCategoryObject.url}`);
    }
  };
  return (
    <div className={styles.tabsParent}>
      <ul className={styles.tabs}>
        {categories.map((el) => (
          <li
            key={el}
            className={`${styles.tab} ${
              activeCategory === el ? styles.active : ""
            }`}
            onClick={() => {
              setActiveCategory(el);
              setSelectedFilter("");
            }}
          >
            {el}
          </li>
        ))}
      </ul>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.contentItem}>
            <p className={styles.contentTitle}>
              {activeCategoryObject?.filterName}
            </p>
            <div
              className={styles.popupBtn}
              onClick={() => {
                setIsPopupOpen(!isPopupOpen);
              }}
            >
              <span>
                {activeCategory === "Квартиры"
                  ? selectedFilter
                    ? selectedFilter.slice(0, -5) + "."
                    : "Выберите"
                  : selectedFilter || "Выберите"}
              </span>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>drop-down</title>
                <desc>Created with sketchtool.</desc>
                <g
                  id="directional"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="drop-down" fill="#000000">
                    <polygon id="Shape" points="5 8 12 16 19 8"></polygon>
                  </g>
                </g>
              </svg>
            </div>
            {isPopupOpen && (
              <ul className={styles.firstPopup}>
                {activeCategoryObject?.array.map((el) => (
                  <li
                    key={el.name}
                    className={styles.popupItem}
                    onClick={() => handleFilterSelect(el.name)}
                  >
                    {activeCategory === "Квартиры"
                      ? el.name.slice(0, -5) + "."
                      : el.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.contentItem}>
            <p className={styles.contentTitle}>Цена за сутки</p>
            <div className={styles.inputs}>
              <input
                className={styles.price}
                onChange={(e) => {
                  setFromPrice(e.target.value);
                }}
                type="text"
                name=""
                id=""
                value={fromPrice}
              />
              <span>-</span>
              <input
                onChange={(e) => {
                  setToPrice(e.target.value);
                }}
                className={styles.price}
                type="text"
                name=""
                id=""
                value={toPrice}
              />
            </div>
          </div>
        </div>
        <p>
          На карте <MdPlace />{" "}
        </p>
        <button onClick={showBtn} className={styles.show}>
          Показать {">"}
        </button>
      </div>
    </div>
  );
};
