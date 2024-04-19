import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AutoItem, AvailableType } from "../types";
import { AppartmentItem } from "../types";
import { HouseItem } from "../types";

export type FetchListingsArgs = {
  category?: string;
  filter: FilterAppartmentsType | FilterAutoType | FilterHouseType;
  fromPrice: number;
  toPrice: number;
};

export const fetchListings = createAsyncThunk(
  "listings/fetchListingsStatus",
  async (params: FetchListingsArgs) => {
    const { category, filter, fromPrice, toPrice } = params;

    const queryParams = Object.keys(filter).length
      ? `?${Object.keys(filter)[0]}=${Object.values(filter)[0]}`
      : "";
    let response;
    if (queryParams) {
      response = await axios.get<AutoItem[] | AppartmentItem[] | HouseItem[]>(
        `http://localhost:3000/${category}${queryParams}&price_per_day_gte=${fromPrice}&price_per_day_lte=${toPrice}`
      );
    } else {
      response = await axios.get(
        `http://localhost:3000/${category}?price_per_day_gte=${fromPrice}&price_per_day_lte=${toPrice}`
      );
    }

    return response.data;
  }
);

type ListingSliceState = {
  listings: AvailableType;
  filter: FilterAppartmentsType | FilterAutoType | FilterHouseType;
  price: PriceType;
};

type PriceType = {
  fromPrice: number;
  toPrice: number;
};

const initialState: ListingSliceState = {
  listings: [],
  filter: {},
  price: {
    fromPrice: 0,
    toPrice: 999999,
  },
};

type FilterAppartmentsType = {
  rooms?: string;
};

type FilterHouseType = {
  size?: string;
};
type FilterAutoType = {
  type?: string;
};

export const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    clearListings(state) {
      state.listings = [];
    },
    clearFilter(state) {
      state.filter = {};
    },
    setFilter(
      state,
      action: PayloadAction<{
        key: "rooms" | "type" | "size";
        value: string;
      }>
    ) {
      state.filter = { [action.payload.key]: action.payload.value };
    },
    addListing(
      state,
      action: PayloadAction<{
        category: string;
        listing: FilterAutoType | FilterHouseType | FilterAppartmentsType;
      }>
    ) {
      axios.post(
        `http://localhost:3000/${action.payload.category}`,
        action.payload.listing
      );
      console.log(
        `http://localhost:3000/${action.payload.category}`,
        action.payload.listing
      );
    },
    setPrice(state, action: PayloadAction<PriceType>) {
      state.price.fromPrice = action.payload.fromPrice;
      state.price.toPrice = action.payload.toPrice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListings.fulfilled, (state, action) => {
      state.listings = action.payload;
    });
  },
});
export const { clearListings, setFilter, clearFilter, setPrice, addListing } =
  listingsSlice.actions;
export default listingsSlice.reducer;
