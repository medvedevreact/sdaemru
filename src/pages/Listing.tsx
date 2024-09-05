import { useEffect, useState } from "react";
import { ListingUpper } from "../components/ListingUpper/ListingUpper";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Listing = () => {
  const { id } = useParams();
  const { category } = useParams();

  const [listing, setListing] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/${category}/${id}`).then((resp) => {
      setListing(resp.data);
    });
  }, [id, category]);
  return (
    <div className="pageWrapper">
      <div className="container">
        {listing && (
          <>
            <ListingUpper listing={listing} />
          </>
        )}
      </div>
    </div>
  );
};
