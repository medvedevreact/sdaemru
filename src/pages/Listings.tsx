import { useEffect } from "react";
import { ListingsTitle } from "../components/ListingsTitle/ListingsTitle";
import { useParams } from "react-router-dom";
import { clearFilter, fetchListings } from "../store/listingsSlice";
import { ListingsItems } from "../components/ListingsItems/ListingsItems";
import { useUnmount } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "../store";

export const Listings = () => {
  const { category } = useParams<{ category: string }>();
  const safeCategory = category ?? "defaultCategory";

  const listings = useAppSelector((state) => state.listings.listings);
  const filterOptions = useAppSelector((state) => state.listings.filter);
  const fromPrice = useAppSelector((state) => state.listings.price.fromPrice);
  const toPrice = useAppSelector((state) => state.listings.price.toPrice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getListings = () => {
      dispatch(
        fetchListings({
          category,
          filter: filterOptions,
          fromPrice: fromPrice,
          toPrice: toPrice,
        })
      );
    };
    getListings();
  }, [filterOptions, category, dispatch, fromPrice, toPrice]);

  useUnmount(() => {
    dispatch(clearFilter());
  });

  return (
    <div>
      <ListingsTitle category={safeCategory} />
      <div className="pageWrapper">
        {listings.length > 0 && <ListingsItems items={listings} />}
      </div>
    </div>
  );
};
