export type AppartmentItem = {
  id?: string;
  title: string;
  description: string;
  price_per_day: number;
  location: string;
  metro: string;
  district: string;
  rooms: string;
  photo: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
};

export type HouseItem = {
  id?: string;
  title: string;
  description: string;
  price_per_day: number;
  location: string;
  metro: string;
  district: string;
  size: string;
  photo: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
};

export type AutoItem = {
  id?: string;
  title: string;
  description: string;
  price_per_day: number;
  location: string;
  metro: string;
  district: string;
  type: string;
  photo: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
};

export type AvailableType = AutoItem[] | AppartmentItem[] | HouseItem[];
