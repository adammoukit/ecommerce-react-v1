import React from "react";
import "./CartItem.css";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ prod }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const updatedQuantity = prod.quantity + num;
    if (updatedQuantity > 0) {
      const data = {
        data: { quantity: updatedQuantity },
        cartItemId: prod.id,
      };
      dispatch(updateCartItem(data));
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(prod.id));
  };

  return (
    <div className="p-3 CiContainer rounded-lg flex flex-col sm:flex-row justify-between items-center lg:items-center space-y-4 lg:space-y-0">
      {/* Product Image and Details */}
      <div className="flex flex-col sm:flex-row items-center lg:items-start">
        <div className="w-[5rem] h-[5rem] sm:w-[7rem] sm:h-[7rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={prod.product.imageUrl}
            alt="product image"
          />
        </div>
        <div className="ml-4 space-y-2 text-center lg:text-left">
          <p className="font-semibold text-blue-700 text-lg">{prod.product.title}</p>
          <p className="opacity-70 font-semibold">Size: {prod.size} | {prod.product.color}</p>
          <p className="opacity-70">Vendeur : Moukit Fashion Store</p>
          <div className="flex justify-center lg:justify-start space-x-3 mt-2 text-gray-900">
            <p className="font-bold text-green-500">{prod.product.discountedPrice} CFA</p>
            <p className="opacity-50 line-through">{prod.product.price} CFA</p>
            <p className="text-green-900 font-semibold">
              {prod.product.discountPercent}% off
            </p>
          </div>
        </div>
      </div>

      {/* Quantity and Remove Button */}
      <div className="flex flex-col items-center lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={prod.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{prod.quantity}</span>
          <IconButton onClick={() => handleUpdateCartItem(1)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <Button onClick={handleRemoveCartItem}>
          <span className="border border-red-300 px-3 py-1 rounded-md">
            Remove
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
