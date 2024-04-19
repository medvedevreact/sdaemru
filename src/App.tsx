import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";

import { UpperHeader } from "./components/UpperHeader/UpperHeader";
import { UpperMiddle } from "./components/UpperMiddle/UpperMiddle";
import { Footer } from "./components/Footer/Footer";
import { Listings } from "./pages/Listings";

import { Listing } from "./pages/Listing";
import { AddListing } from "./pages/AddListing";

function App() {
  return (
    <div>
      <UpperHeader />
      <Header />
      <div className="header-devider"></div>
      <UpperMiddle />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:category" element={<Listings />} />
        <Route path="/listings/:category/:id" element={<Listing />} />
        <Route path="/addListing" element={<AddListing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
