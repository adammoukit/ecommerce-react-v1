import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className="productCard w-[13rem] m-3 transition-all cursor-pointer">
      <div className="h-[12rem]">
        <img
          className="h-full w-full object-cover "
          src={product.imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <h3 className="font-bold opacity-80 text-black">{product.brand}</h3>
          <p>{product.title} </p>
        </div>
        <div className="flex space-x-2 items-center">
          <h2 className="font-semibold">{product.discountedPrice} CFA</h2>
          <h3 className="line-through opacity-50">{product.price}</h3>
          <h3 className="text-green-600 font-semibold">
            {product.discountPersent}% off
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
