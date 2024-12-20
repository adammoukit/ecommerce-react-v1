import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { addItemToCart, getCart } from "../../../State/Cart/Action";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(3);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (id) => {
    const data = { productId: id, size: "S" };
    dispatch(addItemToCart(data));
    console.log("data :", data);

    // Forcer l'actualisation de la page après la navigation
    // window.location.reload();
  };

  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    // Ajouter ici une logique pour envoyer l'info au backend
    console.log(liked ? "Disliked" : "Liked");
  };

  const productSellToolTipValue = "228 ventes pour ce produit !";

  return (
    <div className="productCard  w-[15rem] sm:w-[12rem]  transition-all cursor-pointer rounded-lg">
      <div className="h-[12rem] p-2">
        <img
          onClick={() => navigate(`/product/${product.id}`)}
          className="h-full w-full object-cover "
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart flex flex-col gap-2 border-t-2 w-full  p-1 ">
        <div className="flex items-center w-full justify-between">
          <h3 className="text-white font-bold text-xs px-2 py-1 rounded-sm bg-red-600">
            -{product.discountPercent}
          </h3>
          <span className="text-xs text-red-800">Offre à durrée limitée</span>
        </div>
        <div>
          <h3 className="font-bold opacity-80 opacity-80  text-black">
            {product.brand}
          </h3>
          <p className="text-sm opacity-70 font-bold ">{product.title} </p>
        </div>
        <div className="flex space-x-2 justify-between items-center text-xs ">
          <h2 className="font-bold text-red-500 text-lg">
            {product.discountedPrice} CFA
          </h2>
          <h3 className="line-through font-bold text-sm opacity-80">
            {product.price} CFA
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <span>89</span>
        <Tooltip
          title={productSellToolTipValue}
          arrow
          className="text-xs font-bold text-black"
          sx={{fontSize:"16px"}}
        >
          <InfoTwoToneIcon />
        </Tooltip>
      </div>
      <div className="flex items-center justify-end"></div>
      <div className="p-1 flex justify-center items-center">
        <button
          onClick={() => handleAddToCart(product.id)}
          className="w-full bg-yellow-300 p-1 rounded-2xl hover:bg-yellow-500"
        >
          Ajouter au panier
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
