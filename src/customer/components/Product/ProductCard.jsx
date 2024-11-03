import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard  w-[15rem] sm:w-[10rem] m-1 transition-all cursor-pointer  border-2 rounded-lg"
    >
      <div className="h-[12rem] p-2">
        <img
          className="h-full w-full object-cover "
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart border-t-2 w-full bg-gray-300 p-3">
        <div>
          <h3 className="font-bold opacity-80 text-black">{product.brand}</h3>
          <p>{product.title} </p>
        </div>
        <div className="flex space-x-2 items-center text-xs ">
          <h2 className="font-semibold">{product.discountedPrice} CFA</h2>
          <h3 className="line-through opacity-50">{product.price}</h3>
          <h3 className="text-green-600 font-semibold">
            {product.discountPercent}% off
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
