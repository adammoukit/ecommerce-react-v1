import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from "./MainCarouselData";
import "./MainCarousel.css";

const MainCarousel = () => {
  const carouselRef = useRef(null);

  const items = MainCarouselData.map((item) => {
    return (
      <div  className="h-[35rem]">
        <img className="cursor-pointer object-cover object-top h-full carousel-img" src={item.image} />;
      </div>
    );
  });
  const slideNext = () => carouselRef.current.slideNext();
  const slidePrev = () => carouselRef.current.slidePrev();

  return (
    <div className="relative">
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={3000}
        infinite
      />
      <button
        onClick={slidePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#9664;
      </button>
      <button
        onClick={slideNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#9654;
      </button>
    </div>
  );
};
export default MainCarousel;
