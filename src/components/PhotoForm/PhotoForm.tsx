import React, { useState, useEffect } from "react";
import styles from "./PhotoForm.module.scss";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface PhotoFormType {
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;
  fileInputRef: React.RefObject<HTMLInputElement> | null;
  secondPhotoRef: React.RefObject<HTMLInputElement> | null;
  thirdPhotoRef: React.RefObject<HTMLInputElement> | null;
  fourthPhotoRef: React.RefObject<HTMLInputElement> | null;
}

export const PhotoForm: React.FC<PhotoFormType> = ({
  listingObject,
  setListingObject,
  fileInputRef,
  secondPhotoRef,
  thirdPhotoRef,
  fourthPhotoRef,
}) => {
  const [mainPhoto, setMainPhoto] = useState<string>("");
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>([]);
  const refs = [secondPhotoRef, thirdPhotoRef, fourthPhotoRef];

  useEffect(() => {
    if (listingObject.photo && listingObject.photo.length > 0) {
      setMainPhoto(listingObject.photo[0]);
      setAdditionalPhotos(listingObject.photo.slice(1));
    }
  }, [listingObject.photo]);

  const handleMainPhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const updatedPhoto = URL.createObjectURL(file);
      setMainPhoto(updatedPhoto);
      setListingObject({
        ...listingObject,
        photo: [updatedPhoto, ...additionalPhotos],
      });
    }
  };

  const handleAdditionalPhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const updatedPhoto = URL.createObjectURL(file);
      const updatedAdditionalPhotos = [...additionalPhotos];
      updatedAdditionalPhotos[index] = updatedPhoto;
      setAdditionalPhotos(updatedAdditionalPhotos);
      setListingObject({
        ...listingObject,
        photo: [mainPhoto, ...updatedAdditionalPhotos],
      });
    }
  };

  return (
    <div className={styles.formStep}>
      <h3 className={styles.title}>
        3 шаг: <span>Добавьте фотографии</span>
      </h3>
      <div>
        <h4>Главная фотография</h4>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleMainPhotoUpload}
          aria-label="Главная фотография"
        />
        {mainPhoto && <img src={mainPhoto} alt="Main" />}
      </div>
      <div>
        <h4>Дополнительные фотографии</h4>
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <input
              type="file"
              onChange={(e) => handleAdditionalPhotoUpload(e, index)}
              ref={refs[index]}
            />
            {additionalPhotos[index] && (
              <img
                src={additionalPhotos[index]}
                alt={`Additional ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
