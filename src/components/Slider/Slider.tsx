import { useState } from "react";
import styles from "./Slider.module.scss";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface SliderType {
  photo: string[];
}

export const Slider: React.FC<SliderType> = ({ photo }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const nextPhoto = () => {
    if (activePhotoIndex !== photo.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    }
  };

  const isNextDisabled = activePhotoIndex !== photo.length - 1;
  const isPrevDisabled = activePhotoIndex !== 0;

  return (
    <div className={styles.slider}>
      <button
        className={styles.prevBtn}
        disabled={isPrevDisabled ? false : true}
        onClick={prevPhoto}
        aria-label="previous"
      >
        <MdArrowBack />
      </button>
      <img src={`/${photo[activePhotoIndex]}`} alt="photo" />
      <button
        className={styles.nextBtn}
        onClick={nextPhoto}
        disabled={isNextDisabled ? false : true}
        aria-label="next"
      >
        <MdArrowForward />
      </button>
    </div>
  );
};
