import React, { useState } from "react";
import "./CartItem.css";
import { Button, IconButton, CircularProgress } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ prod, loading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateCartItem = async (num) => {
    const updatedQuantity = prod.quantity + num;
    if (updatedQuantity > 0) {
      const data = {
        data: { quantity: updatedQuantity },
        cartItemId: prod.cartItemId,
      };
      await dispatch(updateCartItem(data));
    }
  };

  const handleRemoveCartItem = async () => {
    await dispatch(removeCartItem(prod.cartItemId));
  };

  return (
    <div
      className={`p-3 CiContainer rounded-lg flex flex-col sm:flex-row bg-slate-50 justify-between items-center sm:items-center lg:items-center space-y-4 lg:space-y-0 ${
        loading ? "" : ""
      }`}
    >
      {loading && <CircularProgress className="absolute z-10" />}

      {/* Product Image and Details */}
      <div className="flex flex-col sm:flex-row items-center lg:items-start ">
        <div className="w-[3rem] h-[3rem] sm:w-[5rem] sm:h-[5rem] lg:w-[5rem] lg:h-[5rem] border-2 p-2 rounded-md">
          <img
            className="w-full h-full object-cover object-top rounded-md"
            src={prod.mediaUrls[0]}
            alt="product image"
          />
        </div>
        <div className="ml-4 space-y-2 text-center lg:text-left CartItemTypographie">
          <div className="font-bold  text-2xl">
            <p>{prod.productName}</p>
            <p className="text-xs font-medium opacity-80">
              <span>SKU:</span>
              {prod.variant?.sku}
            </p>
          </div>
          <div className="opacity-90 font-semibold flex space-x-1">
            Taille: {prod.size?.name} |
            <span>
              {"  "}
              {prod.variant?.attributeName}:{prod.variant?.attributeValue}
            </span>
          </div>
          <p className="opacity-80">Vendeur : Moukit Fashion Store</p>
          <div className="flex justify-center lg:justify-start text-xs space-x-3 mt-2 text-gray-900">
            <div>
              <p className="font-bold text-lg text-green-500">
                <span>Quantity:</span> {prod.quantity}
              </p>
            </div>
            {/* <p className="opacity-50 line-through">{prod.basePrice} CFA</p> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-start space-y-2 lg:space-y-1">
        <p className="text-xl font-bold opacity-90">
          PRIX{" : "} {prod.basePrice}
          {" F CFA"}{" "}
        </p>
        <p className="text-green-900 font-semibold">
          Prix Additionel : {prod.variant?.additionalPrice}
          {" F CFA"}
        </p>
      </div>

      {/* Quantity and Remove Button */}
      <div className="flex flex-col items-center lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4">
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={() => handleUpdateCartItem(-1)}
            disabled={prod.quantity <= 1 || isLoading}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <div className="flex flex-col space-y-2 items-center justify-center">
            <span className="font-bold opacity-60">Qte</span>
            <span className="py-1 px-7 border font-bold rounded-sm">
              {prod.quantity}
            </span>
          </div>

          <IconButton
            onClick={() => handleUpdateCartItem(1)}
            disabled={isLoading}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <Button onClick={handleRemoveCartItem} disabled={isLoading}>
          <span className="border border-red-300 px-3 py-1 rounded-md">
            Remove
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
