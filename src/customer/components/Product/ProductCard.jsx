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
    <div className="productCard border-2 w-full sm:w-[15rem] md:w-[171px] lg:w-[195px] bg-white transition-all cursor-pointer rounded p-2 flex flex-row sm:flex-col">
      {/* Conteneur d'image (100% width pour sm et +) */}
      <div className="w-[40%] sm:w-full h-[10rem] sm:h-auto">
        <img
          onClick={() => navigate(`/product/${product.id}`)}
          className="h-full w-full object-contain rounded-lg"
          src={product.media?.[0]?.url || "https://via.placeholder.com/150"}
          alt=""
        />
      </div>

      {/* Conteneur des détails (100% width pour sm et +) */}
      <div className="w-[60%] sm:w-full flex flex-col justify-between p-1 sm:pl-3">
        <div>
          {/* Nom avec ellipsis */}
          <p className="text-sm lg:text-[14px] text-gray-500 font-bold line-clamp-2 sm:line-clamp-none">
            {product.name}
          </p>

          {/* Prix */}
          <div className="mt-1">
            <h2 className="font-extrabold text-[18px] sm:text-[23px] text-black">
              {product.price} <span className="text-[12px]">F CFA</span>
            </h2>
          </div>
        </div>

        {/* Boutons */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-1">
          <button className="w-full bg-yellow-300 py-1 rounded-2xl hover:bg-yellow-500">
            {/* Correction responsive du texte */}
            <Typography className="text-[10px] sm:text-[12px]">
              Voir le produit
            </Typography>
          </button>
          <IconButton
            color={liked ? "error" : "default"}
            onClick={handleLike}
            size="small"
          >
            {liked ? (
              <FavoriteIcon fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
