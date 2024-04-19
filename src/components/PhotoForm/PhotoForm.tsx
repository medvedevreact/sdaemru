import React from "react";
import styles from "./PhotoForm.module.scss";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface PhotoFormType {
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;
  fileInputRef: React.RefObject<HTMLInputElement> | null;
}

export const PhotoForm: React.FC<PhotoFormType> = ({
  listingObject,
  setListingObject,
  fileInputRef,
}) => {
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const updatedPhoto = URL.createObjectURL(file);
      console.log(updatedPhoto);

      setListingObject({
        ...listingObject,
        photo: updatedPhoto,
      });
    }
  };

  return (
    <div className={styles.formStep}>
      <h3 className={styles.title}>
        3 шаг: <span>Добавьте фотографии</span>
      </h3>
      <input type="file" onChange={handlePhotoUpload} ref={fileInputRef} />
    </div>
  );
};
