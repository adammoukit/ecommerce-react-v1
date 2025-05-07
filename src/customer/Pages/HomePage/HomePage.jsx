import React from "react";
import MainCarousel from "../../components/HomeCarosel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens/men_kurta";
import SuuggetProduct from "../../components/Homme suggest product/SuuggetProduct";

const HomePage = () => {
  return (
    <div className="bg-slate-200">
      <MainCarousel />

      <div className="py-40 mt-20 m-5 space-y-10  border-2">
        <SuuggetProduct />
        <HomeSectionCarousel data={mens_kurta} sectionName="MEN'S SHIRT" />
       
      </div>
    </div>
  );
};

export default HomePage;
