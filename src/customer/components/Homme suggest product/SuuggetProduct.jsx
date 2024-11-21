import React from "react";
import Slider from "react-slick";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SuggestedProduct = () => {
  const settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Mobiles
        settings: {
          slidesToShow: 1, // Affiche 1 carte sur les petits écrans
        },
      },
      {
        breakpoint: 1024, // Tablettes
        settings: {
          slidesToShow: 2, // Affiche 2 cartes sur les tablettes
        },
      },
      {
        breakpoint: 1280, // Écrans larges
        settings: {
          slidesToShow: 3, // Affiche 3 cartes sur les écrans larges
        },
      },
    ],
  };

  return (
    <div className="w-full rounded-sm p-5 gap-4 h-auto bg-white">
      <div className="flex flex-col gap-4">
        <h2>Autres articles à découvrir</h2>
        <Slider {...settings}>
          <div className="px-2">
            <img
              src="https://pic.clubic.com/c4030a812201148/1200x801/smart/macbook-pro-14-m2.jpg"
              alt="image pc"
              className="w-full h-64 object-cover" // Classe Tailwind pour fixer la hauteur
            />
          </div>
          <div className="px-2">
            <img
              src="https://m.media-amazon.com/images/I/71BEARnNyWL._AC_SY200_.jpg"
              alt="image pc"
              className="w-full h-64 object-cover" // Classe Tailwind pour fixer la hauteur
            />
          </div>
          <div className="px-2">
            <img
              src="https://m.media-amazon.com/images/I/71ATHe-lbEL._AC_SY200_.jpg"
              alt="image pc"
              className="w-full h-64 object-cover" // Classe Tailwind pour fixer la hauteur
            />
          </div>
          <div className="px-2">
            <img
              src="https://m.media-amazon.com/images/I/612UmJJ8vvL._AC_SY200_.jpg"
              alt="image pc"
              className="w-full h-64 object-cover" // Classe Tailwind pour fixer la hauteur
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SuggestedProduct;
