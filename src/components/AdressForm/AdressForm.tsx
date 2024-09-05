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

const metroStations = [
  { name: "Авиамоторная", id: 1 },
  { name: "Автозаводская", id: 2 },
  { name: "Академическая", id: 3 },
  { name: "Александровский сад", id: 4 },
  { name: "Алексеевская", id: 5 },
  { name: "Алма-Атинская", id: 6 },
  { name: "Алтуфьево", id: 7 },
  { name: "Аннино", id: 8 },
  { name: "Арбатская (АПЛ)", id: 9 },
  { name: "Арбатская (ФЛ)", id: 10 },
  { name: "Аэропорт", id: 11 },
  { name: "Бабушкинская", id: 12 },
  { name: "Багратионовская", id: 13 },
  { name: "Баррикадная", id: 14 },
  { name: "Бауманская", id: 15 },
  { name: "Беговая", id: 16 },
  { name: "Белорусская", id: 17 },
  { name: "Беляево", id: 18 },
  { name: "Бибирево", id: 19 },
  { name: "Библиотека имени Ленина", id: 20 },
  { name: "Битцевский парк", id: 21 },
  { name: "Борисово", id: 22 },
  { name: "Боровицкая", id: 23 },
  { name: "Ботанический сад", id: 24 },
  { name: "Братиславская", id: 25 },
  { name: "Бульвар Адмирала Ушакова", id: 26 },
  { name: "Бульвар Дмитрия Донского", id: 27 },
  { name: "Бульвар Рокоссовского", id: 28 },
  { name: "Бунинская аллея", id: 29 },
  { name: "Варшавская", id: 30 },
  { name: "ВДНХ", id: 31 },
  { name: "Владыкино", id: 32 },
  { name: "Водный стадион", id: 33 },
  { name: "Войковская", id: 34 },
  { name: "Волгоградский проспект", id: 35 },
  { name: "Волжская", id: 36 },
  { name: "Волоколамская", id: 37 },
  { name: "Воробьёвы горы", id: 38 },
  { name: "Выставочная", id: 39 },
  { name: "Выхино", id: 40 },
  { name: "Деловой центр", id: 41 },
  { name: "Динамо", id: 42 },
  { name: "Дмитровская", id: 43 },
  { name: "Добрынинская", id: 44 },
  { name: "Домодедовская", id: 45 },
  { name: "Достоевская", id: 46 },
  { name: "Дубровка", id: 47 },
  { name: "Жулебино", id: 48 },
  { name: "Зябликово", id: 49 },
  { name: "Измайловская", id: 50 },
  { name: "Калужская", id: 51 },
  { name: "Кантемировская", id: 52 },
  { name: "Каховская", id: 53 },
  { name: "Каширская", id: 54 },
  { name: "Киевская", id: 55 },
  { name: "Китай-город", id: 56 },
  { name: "Кожуховская", id: 57 },
  { name: "Коломенская", id: 58 },
  { name: "Комсомольская", id: 59 },
  { name: "Коньково", id: 60 },
  { name: "Красногвардейская", id: 61 },
  { name: "Краснопресненская", id: 62 },
  { name: "Красносельская", id: 63 },
  { name: "Красные ворота", id: 64 },
  { name: "Крестьянская застава", id: 65 },
  { name: "Кропоткинская", id: 66 },
  { name: "Крылатское", id: 67 },
  { name: "Кузнецкий мост", id: 68 },
  { name: "Кузьминки", id: 69 },
  { name: "Кунцевская", id: 70 },
  { name: "Курская", id: 71 },
  { name: "Кутузовская", id: 72 },
  { name: "Ленинский проспект", id: 73 },
  { name: "Лермонтовский проспект", id: 74 },
  { name: "Лесопарковая", id: 75 },
  { name: "Лубянка", id: 76 },
  { name: "Люблино", id: 77 },
  { name: "Марксистская", id: 78 },
  { name: "Марьина роща", id: 79 },
  { name: "Марьино", id: 80 },
  { name: "Маяковская", id: 81 },
  { name: "Медведково", id: 82 },
  { name: "Международная", id: 83 },
  { name: "Менделеевская", id: 84 },
  { name: "Митино", id: 85 },
  { name: "Молодежная", id: 86 },
  { name: "Мякинино", id: 87 },
  { name: "Нагатинская", id: 88 },
  { name: "Нагорная", id: 89 },
  { name: "Нахимовский проспект", id: 90 },
  { name: "Новогиреево", id: 91 },
  { name: "Новокосино", id: 92 },
  { name: "Новокузнецкая", id: 93 },
  { name: "Новослободская", id: 94 },
  { name: "Новоясеневская", id: 95 },
  { name: "Новые Черемушки", id: 96 },
  { name: "Октябрьская", id: 97 },
  { name: "Октябрьское поле", id: 98 },
  { name: "Орехово", id: 99 },
  { name: "Отрадное", id: 100 },
  { name: "Охотный ряд", id: 101 },
  { name: "Павелецкая", id: 102 },
  { name: "Парк культуры", id: 103 },
  { name: "Парк Победы", id: 104 },
  { name: "Партизанская", id: 105 },
  { name: "Первомайская", id: 106 },
  { name: "Перово", id: 107 },
  { name: "Петровско-Разумовская", id: 108 },
  { name: "Печатники", id: 109 },
  { name: "Пионерская", id: 110 },
  { name: "Планерная", id: 111 },
  { name: "Площадь Ильича", id: 112 },
  { name: "Площадь Революции", id: 113 },
  { name: "Полежаевская", id: 114 },
  { name: "Полянка", id: 115 },
  { name: "Пражская", id: 116 },
  { name: "Преображенская площадь", id: 117 },
  { name: "Пролетарская", id: 118 },
  { name: "Проспект Вернадского", id: 119 },
  { name: "Проспект Мира", id: 120 },
  { name: "Профсоюзная", id: 121 },
  { name: "Пушкинская", id: 122 },
  { name: "Речной вокзал", id: 123 },
  { name: "Рижская", id: 124 },
  { name: "Римская", id: 125 },
  { name: "Рязанский проспект", id: 126 },
  { name: "Савеловская", id: 127 },
  { name: "Свиблово", id: 128 },
  { name: "Севастопольская", id: 129 },
  { name: "Семеновская", id: 130 },
  { name: "Серпуховская", id: 131 },
  { name: "Славянский бульвар", id: 132 },
  { name: "Смоленская (АПЛ)", id: 133 },
  { name: "Смоленская (ФЛ)", id: 134 },
  { name: "Сокол", id: 135 },
  { name: "Сокольники", id: 136 },
  { name: "Спартак", id: 137 },
  { name: "Спортивная", id: 138 },
  { name: "Сретенский бульвар", id: 139 },
  { name: "Строгино", id: 140 },
  { name: "Студенческая", id: 141 },
  { name: "Сухаревская", id: 142 },
  { name: "Сходненская", id: 143 },
  { name: "Таганская", id: 144 },
  { name: "Тверская", id: 145 },
  { name: "Театральная", id: 146 },
  { name: "Текстильщики", id: 147 },
  { name: "Теплый стан", id: 148 },
  { name: "Тимирязевская", id: 149 },
  { name: "Третьяковская", id: 150 },
  { name: "Тропарево", id: 151 },
  { name: "Трубная", id: 152 },
  { name: "Тульская", id: 153 },
  { name: "Тургеневская", id: 154 },
  { name: "Тушинская", id: 155 },
  { name: "Улица 1905 года", id: 156 },
  { name: "Улица Академика Янгеля", id: 157 },
  { name: "Улица Горчакова", id: 158 },
  { name: "Улица Скобелевская", id: 159 },
  { name: "Улица Старокачаловская", id: 160 },
  { name: "Университет", id: 161 },
  { name: "Филевский парк", id: 162 },
  { name: "Фили", id: 163 },
  { name: "Фрунзенская", id: 164 },
  { name: "Царицыно", id: 165 },
  { name: "Цветной бульвар", id: 166 },
  { name: "Черкизовская", id: 167 },
  { name: "Чертановская", id: 168 },
  { name: "Чеховская", id: 169 },
  { name: "Чистые пруды", id: 170 },
  { name: "Чкаловская", id: 171 },
  { name: "Шаболовская", id: 172 },
  { name: "Шипиловская", id: 173 },
  { name: "Шоссе Энтузиастов", id: 174 },
  { name: "Щелковская", id: 175 },
  { name: "Щукинская", id: 176 },
  { name: "Электрозаводская", id: 177 },
  { name: "Юго-Западная", id: 178 },
  { name: "Южная", id: 179 },
  { name: "Ясенево", id: 180 },

  { name: "Новопеределкино", id: 181 },
  { name: "Рассказовка", id: 182 },
  { name: "Минская", id: 183 },
  { name: "Ломоносовский проспект", id: 184 },
  { name: "Раменки", id: 185 },
  { name: "Мичуринский проспект", id: 186 },
  { name: "Озёрная", id: 187 },
  { name: "Говорово", id: 188 },
  { name: "Солнцево", id: 189 },
  { name: "Боровское шоссе", id: 190 },
  { name: "Новопеределкино", id: 191 },
  { name: "Воронцовская", id: 192 },
  { name: "Зюзино", id: 193 },
  { name: "Каховка", id: 194 },
  { name: "Варшавская", id: 195 },
  { name: "Каховская", id: 196 },
  { name: "Битцевский парк", id: 197 },
  { name: "Лесопарковая", id: 198 },
  { name: "Улица Старокачаловская", id: 199 },
  { name: "Улица Скобелевская", id: 200 },
];

export const AdressForm: React.FC<AdressFormProps> = ({
  listingObject,
  setListingObject,
}) => {
  const [input, setInput] = useState(listingObject.location);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [selectedMetroStation, setSelectedMetroStation] = useState("");

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
  }, [input, debouncedFetchData]);

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
      <select
        value={selectedMetroStation}
        onChange={(e) => {
          setSelectedMetroStation(e.target.value);
          setListingObject({ ...listingObject, metro: e.target.value });
        }}
        className={styles.select}
      >
        <option value="">Выберите ближайшую станцию метро</option>
        {metroStations.map((station) => (
          <option key={station.id} value={station.name}>
            {station.name}
          </option>
        ))}
      </select>
    </form>
  );
};
