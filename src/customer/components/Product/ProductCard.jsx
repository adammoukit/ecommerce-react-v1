import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(3);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard  w-[15rem] sm:w-[12rem]  transition-all cursor-pointer  border-2 rounded-lg"
    >
      <div className="h-[12rem] p-2">
        <img
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
          <span className="text-xs text-red-500">Offre à durrée limitée</span>
        </div>
        <div>
          <h3 className="font-bold opacity-80 text-black">{product.brand}</h3>
          <p>{product.title} </p>
        </div>
        <div className="flex space-x-2 justify-between items-center text-xs ">
          <h2 className="font-semibold">{product.discountedPrice} CFA</h2>
          <h3 className="line-through opacity-50">{product.price} CFA</h3>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <span>89</span>
      </div>
      <div className="p-1">
        <button className="w-full bg-yellow-300 p-1 rounded-2xl hover:bg-yellow-500">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
