import React, { useEffect, useState } from "react";
import styles from "./ListingUpper.module.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaWhatsapp } from "react-icons/fa";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";
import ListingDesc from "../ListingDesc/ListingDesc";
import axios from "axios";

interface ListingUpperType {
  listing: AutoItem | AppartmentItem | HouseItem;
}

export const ListingUpper: React.FC<ListingUpperType> = ({ listing }) => {
  const [mainPhoto, setMainPhoto] = useState(0);
  const [coordinates, setCoordinates] = useState<{
    lat: string | number;
    lon: string | number;
  } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            listing.location
          )}`
        );
        const data = response.data;
        if (data.length > 0) {
          setCoordinates({ lat: data[0].lat, lon: data[0].lon });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (listing.location) {
      fetchCoordinates();
    }
  }, [listing.location]);

  const position = coordinates
    ? [parseFloat(String(coordinates.lat)), parseFloat(String(coordinates.lon))]
    : null;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.album}>
        {listing.photo.map((photo, index) => (
          <li
            key={index}
            className={`${styles.albumPhoto} ${
              index === mainPhoto ? styles.activePhoto : ""
            }`}
            onClick={() => setMainPhoto(index)}
          >
            <img src={`../${photo}`} alt={`Photo ${index + 1}`} />
          </li>
        ))}
      </ul>
      <div className={styles.MainPhotoAndDesc}>
        <img
          src={`../${listing.photo[mainPhoto]}`}
          className={styles.mainPhoto}
        ></img>
        <ListingDesc listing={listing} />
      </div>
      <div className={styles.contactsAndMap}>
        <div className={styles.contacts}>
          <div className={styles.contactsPhoto}></div>
          <h2 className={styles.nameTitle}>{listing.owner.name}</h2>
          <p className={styles.email}>{listing.owner.email}</p>
          <p className={styles.number}>{listing.owner.phone}</p>

          <button className={styles.writeBtn}>
            <p>
              <span className={styles.hideOnMobile}>Написать </span>WhatsApp
            </p>
            <FaWhatsapp />
          </button>
          <button className={styles.writeBtn}>
            <p>
              <span className={styles.hideOnMobile}>Написать </span>WhatsApp
            </p>
            <FaWhatsapp />
          </button>
          <button className={styles.writeBtn}>
            <p>
              <span className={styles.hideOnMobile}>Написать </span>WhatsApp
            </p>
            <FaWhatsapp />
          </button>
        </div>
        {coordinates && position && (
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className={styles.map}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.lat, coordinates.lon]}>
              <Popup>{listing.title} находится здесь.</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};
