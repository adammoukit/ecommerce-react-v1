import React, { useEffect, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from "./MainCarouselData";
import "./MainCarousel.css";

const MainCarousel = () => {
  const carouselRef = useRef(null);
  const [text, setText] = useState("");
  const fullText =
    "chez MOUKIT SHOP. Découvrez notre sélection exclusive de produits.";
  const speed = 100; // Vitesse d'écriture en ms

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(intervalId); // Arrête l'intervalle une fois le texte terminé
      }
    }, speed);

    return () => clearInterval(intervalId); // Nettoyage lors du démontage du composant
  }, []);

  const items = MainCarouselData.map((item) => {
    return (
      <div className="h-[31rem] relative">
        <img
          className="cursor-pointer object-cover object-top h-full w-full carousel-img"
          src={item.image}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
        <div className="absolute top-24 left-20 text-white text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            BIENVENUE
          </h1>
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${
              text.length === fullText.length ? "" : "typing-text"
            }`}
          >
            {text}
          </h2>
        </div>
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
