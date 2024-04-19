import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdressForm.module.scss";
import { debounce } from "lodash";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface AdressFormProps {
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;
}

type SuggestionItem = {
  addresstype: string;
  boundingbox: string[];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  place_id: number;
  place_rank: number;
  type: string;
};

export const AdressForm: React.FC<AdressFormProps> = ({
  listingObject,
  setListingObject,
}) => {
  const [input, setInput] = useState(listingObject.location);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  console.log(suggestions);

  const fetchData = () => {
    if (input.length > 3) {
      axios
        .get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            format: "json",
            q: input,
          },
        })
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    } else {
      setSuggestions([]);
    }
  };
  const debouncedFetchData = debounce(fetchData, 1000);

  useEffect(() => {
    debouncedFetchData();

    return () => {
      debouncedFetchData.cancel();
    };
  }, [input]);

  return (
    <form className={styles.formContainer}>
      <h3>
        1 шаг: <span className={styles.title}>Заполнение адреса</span>
      </h3>
      <p className={styles.text}>
        Начните вводить название населенного пункта. В случае, если не удалось
        найти необходимый адрес, то добавьте любой и отправьте верный на
        e-mail:sdaem@sdaem.by или +375(29) 621-48-33 (смс, viber, telegram,
        whatsApp).
      </p>
      <input
        type="text"
        value={listingObject.location}
        onChange={(e) => {
          setInput(e.target.value);
          setListingObject({
            ...listingObject,
            location: e.target.value,
          });
        }}
        placeholder="Введите адрес"
        className={styles.input}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setInput(item.display_name);
                setListingObject({
                  ...listingObject,
                  location: item.display_name,
                });
                setSuggestions([]);
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
