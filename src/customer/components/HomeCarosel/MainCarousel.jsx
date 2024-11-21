import React, { useEffect, useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from "./MainCarouselData";
import "./MainCarousel.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";

const MainCarousel = () => {
  const carouselRef = useRef(null);
  const [text, setText] = useState("");
  const fullText =
    "Chez MOUKIT SHOP. Découvrez notre sélection exclusive de produits.";
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
      <div className="h-[28rem] relative">
        <img
          className="cursor-pointer object-cover object-top h-full w-full carousel-img"
          src={item.image}
          alt="carousel"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-slate-600 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50"></div>
        <div className="absolute top-10 sm:top-16 md:top-15 left-4 sm:left-8 md:left-20 text-white text-start home-infos">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-orange-600">
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
    <div className="relative home-infos">
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
        className="absolute top-1/3 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#9664;
      </button>
      <button
        onClick={slideNext}
        className="absolute top-1/3 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#9654;
      </button>
      {/* Section superposée pour les sous-catégories */}
      {/* <div className="absolute bottom-[-15rem] left-0 w-full bg-opacity-90 p-4 mb-20"> */}
      {/* Ensemble de conteneurs */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-4"> */}
      {/* Premier conteneur de 4 cartes en 2 colonnes et 2 lignes */}
      {/* <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-2xl font-bold">
            <h2>Nos catégories favorites</h2>
            <div className="p-4 h-full grid grid-cols-2 grid-rows-2 gap-4">
              <div className="p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeswTxnBryLYuAyBGukUGVyG3SexLX8XW1Vw&s"
                  alt="Épicerie"
                  className="w-full h-full object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Épicerie</h3>
              </div>
              <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzF4He36_rR6M06JU01dYsuGOXZQOqv5QCkQ&s"
                  alt="Rangements"
                  className="w-full h-full object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  Rangements
                </h3>
              </div>
              <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13Z7UBRiZC9Oz2MV28g04Q-wW3V2cMJlMjQ&s"
                  alt="Objets connectés"
                  className="w-full h-full object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  Objets connectés
                </h3>
              </div>
              <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjdMZmMZwoJse62D-UZ1c4b6mIskIyURSFkA&s"
                  alt="Livres"
                  className="w-full h-full object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Livres</h3>
              </div>
            </div>
          </div> */}

      {/* Deuxième conteneur de 4 cartes en 2 colonnes et 2 lignes */}
      {/* <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-2xl font-bold">
            <h2>Entretenez votre maison</h2>
            <div className="h-full p-4 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSbfoDL04pFN13rVxN2iGBTjxx5qFDE_4BQ&s" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  Quincaillerie
                </h3>
              </div>
              <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTR6qpDuKRiWxIb1ro8lnRoAs-uDdhsBbFg&s" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  Électricité
                </h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://france3-regions.francetvinfo.fr/image/JWeCUWVvWcoCoipfzzwXB7Rau_k/736x415/regions/2020/06/09/5edf21dd7a267_dressing_vetements-2948907.jpg" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Vêtements</h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://www.datocms-assets.com/44717/1620201059-commerce-dalimentation-generale-nrd-d6tul3chle-unsplash.jpg?auto=format&fit=clip&w=512&h=512" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Epiceries</h3>
              </div>
            </div>
          </div> */}
      {/* troisieme conteneur de 4 cartes en 2 colonnes et 2 lignes */}

      {/* <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-2xl font-bold">
            <h2>High-Tech & Accèssoires</h2>
            <div className="h-full p-4 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/GfinEMFXnT42BFxAcDc2rA-1200-80.jpg" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">PC</h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTR6qpDuKRiWxIb1ro8lnRoAs-uDdhsBbFg&s" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  Électricité
                </h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://france3-regions.francetvinfo.fr/image/JWeCUWVvWcoCoipfzzwXB7Rau_k/736x415/regions/2020/06/09/5edf21dd7a267_dressing_vetements-2948907.jpg" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Vêtements</h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://www.datocms-assets.com/44717/1620201059-commerce-dalimentation-generale-nrd-d6tul3chle-unsplash.jpg?auto=format&fit=clip&w=512&h=512" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Epiceries</h3>
              </div>
            </div>
          </div> */}
      {/* quatrieme conteneur de 4 cartes en 2 colonnes et 2 lignes */}
      {/* <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-2xl font-bold">
            <h2>Sports et loisirs</h2>
            <div className="h-full p-4 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yiVzJonCIzglszJLO34VPytKiD5vysfj-g&s" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Football</h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://cdn.nba.com/manage/2024/11/curry-784x441.jpg" // Remplacez par la source de l'image
                  alt="Rangements"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Tennis</h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://www.lequipe.fr/_medias/img-photo-jpg/chaussures-customisees-d-antoine-griezmann-orravan-design/1500000001024835/0:0,857:571-828-552-75/0dc14.jpg" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Crampons</h3>
              </div>
              <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjdMZmMZwoJse62D-UZ1c4b6mIskIyURSFkA&s" // Remplacez par la source de l'image
                  alt="Épicerie"
                  className="w-full h-full object-cover object-top mb-2"
                />
                <h3 className="text-lg font-semibold text-center">Livres</h3>
              </div>
            </div>
          </div> */}
      {/* </div>
      </div> */}

      <div className="absolute bottom-[-15rem] left-0 w-full bg-opacity-90 p-4 mb-20">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={50} // Espace entre les slides
          slidesPerView={1} // Nombre de slides visibles à la fois
          pagination={{ clickable: true }} // Permet de cliquer sur les dots pour naviguer
          loop // Permet le défilement infini
          breakpoints={{
            1024: {
              slidesPerView: 4, // 4 slides pour les grands écrans
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3, // 3 slides pour les écrans moyens
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 2, // 2 slides pour les petits écrans
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1, // 1 slide pour les très petits écrans
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-xl font-bold">
              <h2>Nos catégories favorites</h2>
              <div className="p-4 h-full grid grid-cols-2 grid-rows-2 gap-4">
                <div className="p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeswTxnBryLYuAyBGukUGVyG3SexLX8XW1Vw&s"
                    alt="Épicerie"
                    className="w-full h-full object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Épicerie
                  </h3>
                </div>
                <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzF4He36_rR6M06JU01dYsuGOXZQOqv5QCkQ&s"
                    alt="Rangements"
                    className="w-full h-full object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Rangements
                  </h3>
                </div>
                <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13Z7UBRiZC9Oz2MV28g04Q-wW3V2cMJlMjQ&s"
                    alt="Objets connectés"
                    className="w-full h-full object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Objets connectés
                  </h3>
                </div>
                <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjdMZmMZwoJse62D-UZ1c4b6mIskIyURSFkA&s"
                    alt="Livres"
                    className="w-full h-full object-cover mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">Livres</h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-xl font-bold">
              <h2>Entretenez votre maison</h2>
              <div className="h-full p-4 grid grid-cols-2 grid-rows-2 gap-4">
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSbfoDL04pFN13rVxN2iGBTjxx5qFDE_4BQ&s" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Quincaillerie
                  </h3>
                </div>
                <div className="bg-white p-4 shadow flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTR6qpDuKRiWxIb1ro8lnRoAs-uDdhsBbFg&s" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Électricité
                  </h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://france3-regions.francetvinfo.fr/image/JWeCUWVvWcoCoipfzzwXB7Rau_k/736x415/regions/2020/06/09/5edf21dd7a267_dressing_vetements-2948907.jpg" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Vêtements
                  </h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://www.datocms-assets.com/44717/1620201059-commerce-dalimentation-generale-nrd-d6tul3chle-unsplash.jpg?auto=format&fit=clip&w=512&h=512" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Epiceries
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-xl font-bold">
              <h2>High-Tech & Accèssoires</h2>
              <div className="h-full p-4 grid grid-cols-2 grid-rows-2 gap-4">
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/GfinEMFXnT42BFxAcDc2rA-1200-80.jpg" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">PC</h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTR6qpDuKRiWxIb1ro8lnRoAs-uDdhsBbFg&s" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Électricité
                  </h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://france3-regions.francetvinfo.fr/image/JWeCUWVvWcoCoipfzzwXB7Rau_k/736x415/regions/2020/06/09/5edf21dd7a267_dressing_vetements-2948907.jpg" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Vêtements
                  </h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://www.datocms-assets.com/44717/1620201059-commerce-dalimentation-generale-nrd-d6tul3chle-unsplash.jpg?auto=format&fit=clip&w=512&h=512" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Epiceries
                  </h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col bg-white h-[25rem] p-2 gap-2 text-xl font-bold">
              <h2>Sports et loisirs</h2>
              <div className="h-full p-4 grid grid-cols-2 grid-rows-2 gap-4">
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yiVzJonCIzglszJLO34VPytKiD5vysfj-g&s" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Football
                  </h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://cdn.nba.com/manage/2024/11/curry-784x441.jpg" // Remplacez par la source de l'image
                    alt="Rangements"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">Tennis</h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://www.lequipe.fr/_medias/img-photo-jpg/chaussures-customisees-d-antoine-griezmann-orravan-design/1500000001024835/0:0,857:571-828-552-75/0dc14.jpg" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    Crampons
                  </h3>
                </div>
                <div className="bg-white p-4 shadow  flex flex-col items-center hover:shadow-lg cursor-pointer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjdMZmMZwoJse62D-UZ1c4b6mIskIyURSFkA&s" // Remplacez par la source de l'image
                    alt="Épicerie"
                    className="w-full h-full object-cover object-top mb-2"
                  />
                  <h3 className="text-lg font-semibold text-center">Livres</h3>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainCarousel;
