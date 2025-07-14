import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { addItemToCart, getCart } from "../../../State/Cart/Action";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(3);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    // Ajouter ici une logique pour envoyer l'info au backend
    console.log(liked ? "Disliked" : "Liked");
  };

  const productSellToolTipValue = "228 ventes pour ce produit !";

  return (
    <div className="productCard border-2 w-[15rem] sm:w-[185px] md:w-[171px] lg:w-[195px]  bg-white  transition-all cursor-pointer rounded p-2">
      <div className="h-[13rem] w-full">
        <img
          onClick={() => navigate(`/product/${product.id}`)}
          className="h-full w-full lg:w-[9rem] object-contain rounded-lg"
          src={product.media?.[0]?.url || "https://via.placeholder.com/150"} // Utilise la première URL ou une image par défaut
          alt=""
        />
      </div>
      <div className="textPart flex flex-col gap-2 mt-3 w-full  p-1 ">
        <div>
          <p className="text-sm lg:text-[14px] text-gray-500 line-clamp-2 lg:line-clamp-3 font-bold ">
            {product.name}{" "}
          </p>
        </div>
        <div className="flex space-x-2 justify-start items-center">
          <h2 className="font-extrabold text-[23px] text-black">
            {product.price} <span className="text-[13px]">F CFA</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-end"></div>
      <div className="p-1 flex justify-center items-center">
        <button className="w-full bg-yellow-300 p-1 rounded-2xl hover:bg-yellow-500">
          <Typography style={{ fontSize: "12px" }}>Voir le produit</Typography>
        </button>
        <IconButton
          color={liked ? "error" : "default"} // Couleur rouge si aimé
          onClick={handleLike}
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCard;
