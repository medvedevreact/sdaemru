import React, { useEffect, useState } from "react";
import styles from "./ListingUpper.module.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaWhatsapp } from "react-icons/fa";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";
import { ListingDesc } from "../ListingDesc/ListingDesc";
import axios from "axios";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

interface ListingUpperType {
  listing: AutoItem | AppartmentItem | HouseItem;
}

export const ListingUpper: React.FC<ListingUpperType> = ({ listing }) => {
  const [mainPhoto, setMainPhoto] = useState(0);
  const [coordinates, setCoordinates] = useState<{
    lat: string | number;
    lon: string | number;
  }>({ lat: "", lon: "" });

  const customIcon = new L.Icon({
    iconUrl:
      "https://www.laverielavandiere.fr/wp-content/uploads/2015/11/location.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

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

  const position: LatLngExpression = [
    parseFloat(coordinates.lat.toString()),
    parseFloat(coordinates.lon.toString()),
  ];

  return (
    <div className={styles.mobileWrapper}>
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
              <img src={`/${photo}`} alt={`Photo ${index + 1}`} />
            </li>
          ))}
        </ul>
        <div className={styles.MainPhotoAndDesc}>
          <img
            src={`/${listing.photo[mainPhoto]}`}
            className={styles.mainPhoto}
          ></img>
          <div className={styles.desc}>
            <ListingDesc listing={listing} />
          </div>
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
          {coordinates.lat && coordinates.lon && position && (
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className={styles.map}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[Number(coordinates.lat), Number(coordinates.lon)]}
                icon={customIcon}
              >
                <Popup>{listing.title} находится здесь.</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </div>
      <div className={styles.descMobile}>
        <ListingDesc listing={listing} />
      </div>

      {coordinates.lat && coordinates.lon && position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className={styles.mapMobile}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[Number(coordinates.lat), Number(coordinates.lon)]}
            icon={customIcon}
          >
            <Popup>{listing.title} находится здесь.</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};
