import React from "react";
import MainCarousel from "../../components/HomeCarosel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../Data/mens/men_kurta";

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className="py-20 space-y-10 ">
        <HomeSectionCarousel data={mens_kurta} sectionName="MEN'S SHIRT"/>
        <HomeSectionCarousel data={mens_kurta} sectionName="MEN'S SHOES"/>
        <HomeSectionCarousel data={mens_kurta} sectionName="MEN'S PANTS"/>
        <HomeSectionCarousel data={mens_kurta} sectionName="WOMEN'S DRESS"/>
        
       
      
      </div>
    </div>
  );
};

export default HomePage;
