import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";

const HomeSectionCarousel = ({ data, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  const totalItems = Math.min(data.length, 15); // Limiter à 10 éléments

  const slidePrev = () => {
    const newIndex = Math.max(activeIndex - 1, 0); // Empêche d'aller en dessous de 0
    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex); // Utiliser slideTo pour naviguer
    console.log(activeIndex);
  };

  const slideNext = () => {
    const newIndex = Math.min(activeIndex + 1, totalItems - 1); // Empêche d'aller au-delà du total
    setActiveIndex(newIndex);
    carouselRef.current.slideTo(newIndex); // Utiliser slideTo pour naviguer
    console.log(activeIndex);
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = data.map((item, index) => (
    <div key={index} className="flex justify-center items-center h-full w-full">
      <HomeSectionCard product={item} />
    </div>
  ));

  return (
    <div className="relative px-4 lg:px-8 my-3">
        <h2 className="text-2xl font-extrabold text-gray-900 py-5">{sectionName}</h2>
      <div className="relative p-5 border">
        <AliceCarousel
          ref={carouselRef} // Assigner la référence ici
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />

        {/* Affiche le bouton "Previous" uniquement si activeIndex est supérieur à 0 */}
        {activeIndex > 0 && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slidePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: "-2rem", // Sortir du conteneur
              transform: "translateY(-50%)",
              zIndex: 1000,
            }}
            aria-label="Previous"
          >
            <KeyboardArrowLeftIcon sx={{ color: "black" }} />
          </Button>
        )}

        {/* Affiche le bouton "Next" uniquement si activeIndex est inférieur à totalItems - 1 */}
        {activeIndex < totalItems - 1 && (
          <Button
            variant="contained"
            className="z-50"
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "-2rem", // Sortir du conteneur
              transform: "translateY(-50%)",
              zIndex: 1000,
            }}
            aria-label="Next"
          >
            <KeyboardArrowRightIcon sx={{ color: "black" }} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
