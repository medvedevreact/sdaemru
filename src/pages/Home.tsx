import { Search } from "../components/Search/Search";
import { Gallery } from "../components/Gallery/Gallery";

export const Home = () => {
  return (
    <div className="container">
      <div className="home-page">
        <Search />
        <Gallery />
      </div>
    </div>
  );
};
