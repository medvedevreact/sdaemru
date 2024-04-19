import React, { useEffect, useState } from "react";
import { ListingUpper } from "../components/ListingUpper/ListingUpper";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ListingMiddle } from "../components/ListingMiddle/ListingMiddle";

export const Listing = () => {
  const { id } = useParams();
  const { category } = useParams();

  const [listing, setListing] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:3000/${category}/${id}`).then((resp) => {
      setListing(resp.data);
    });
  }, [id, category]);
  return (
    <div className="pageWrapper">
      <div className="container">
        {listing && (
          <>
            <ListingUpper listing={listing} />
            <ListingMiddle listing={listing} />
          </>
        )}
      </div>
    </div>
  );
};
