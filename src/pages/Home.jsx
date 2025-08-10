import React, { useState } from "react";
import Navbar from "../components/Navbar";

import "../styles/HomePage.css";
import ProductItem from "../components/ProductItem";
import BannerCarousel from "../components/BannerCarousel.jsx";

const Home = () => {
  return (
    <div className="home-home-container">
      <header className="home-logo-container">
        <Navbar />
      </header>

      <section className="home-slider-container">
        {/* Uses images from src/assets/banner-slider via import.meta.glob */}
        <BannerCarousel intervalMs={5000} showDots showButtons />
      </section>

      <section>
        <h3 className="home-section-title">New Arrivals</h3>
        <div className="home-product-grid">
          <ProductItem />
        </div>
      </section>
    </div>
  );
};

export default Home;
