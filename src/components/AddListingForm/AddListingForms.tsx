import React from "react";
import { AdressForm } from "../AdressForm/AdressForm";
import { DescForm } from "../DescForm/DescForm";
import { PriceForm } from "../PriceForm/PriceForm";
import { OptionsForm } from "../OptionsForm/OptionsForm";
import { PhotoForm } from "../PhotoForm/PhotoForm";
import { AppartmentItem, AutoItem, HouseItem } from "../../types";

interface AddListingFormProps {
  activeCategoryKey: string;
  listingObject: AutoItem | HouseItem | AppartmentItem;
  setListingObject: (
    newListingObject: AutoItem | HouseItem | AppartmentItem
  ) => void;

  fileInputRef: React.RefObject<HTMLInputElement> | null;
}

export const AddListingForms: React.FC<AddListingFormProps> = ({
  activeCategoryKey,
  listingObject,
  setListingObject,

  fileInputRef,
}) => {
  return (
    <div>
      <div>
        <AdressForm
          key={activeCategoryKey + "_adress"}
          listingObject={listingObject}
          setListingObject={setListingObject}
        />
        <DescForm
          key={activeCategoryKey + "_desc"}
          listingObject={listingObject}
          setListingObject={setListingObject}
        />
        <PhotoForm
          fileInputRef={fileInputRef}
          key={activeCategoryKey + "_photo"}
          listingObject={listingObject}
          setListingObject={setListingObject}
        />
        <PriceForm
          key={activeCategoryKey + "_price"}
          listingObject={listingObject}
          setListingObject={setListingObject}
        />
        <OptionsForm
          key={activeCategoryKey + "_options"}
          activeCategoryKey={activeCategoryKey}
          listingObject={listingObject}
          setListingObject={setListingObject}
        />
      </div>
    </div>
  );
};
