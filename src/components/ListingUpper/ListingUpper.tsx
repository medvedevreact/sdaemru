import React from "react";
import styles from "./ListingUpper.module.scss";

import { FaWhatsapp } from "react-icons/fa";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface ListingUpperType {
  listing: AutoItem | AppartmentItem | HouseItem;
}

export const ListingUpper: React.FC<ListingUpperType> = ({ listing }) => {
  console.log(listing);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.album}>
        <li className={styles.albumPhoto}></li>
        <li className={styles.albumPhoto}></li>
        <li className={styles.albumPhoto}></li>
        <li className={styles.albumPhoto}></li>
      </ul>
      <div className={styles.mainPhoto}></div>
      <div className={styles.contacts}>
        <div className={styles.contactsPhoto}></div>
        <h2 className={styles.nameTitle}>{listing.owner.name}</h2>
        <p className={styles.email}>{listing.owner.email}</p>
        <p className={styles.number}>{listing.owner.phone}</p>

        <button className={styles.writeBtn}>
          <p>Написать WhatsApp</p>
          <FaWhatsapp />
        </button>
        <button className={styles.writeBtn}>
          <p>Написать WhatsApp</p>
          <FaWhatsapp />
        </button>
        <button className={styles.writeBtn}>
          <p>Написать WhatsApp</p>
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
};
