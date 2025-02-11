import React, { useState } from "react";
import "./CartItem.css";
import { Button, IconButton, CircularProgress } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const CartItem = ({ prod, loading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Détermine le texte des variantes selon le type
  const getVariantText = () => {
    switch (prod.variantType) {
      case "COLOR":
        return `Couleur: ${prod.selectedColor}`;
      case "SIZE":
        return `Taille: ${prod.selectedSize}`;
      case "COLOR_AND_SIZE":
        return `Couleur: ${prod.selectedColor} | Taille: ${prod.selectedSize}`;
      default:
        return null;
    }
  };

  // Détermine si on affiche le prix additionnel
  const showAdditionalPrice =
    prod.variantType !== "NONE" && prod.variant?.additionalPrice;

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
    await dispatch(removeCartItem(prod.id));
  };

  return (
    <div
      className={`p-3 CiContainer rounded-lg flex flex-col sm:flex-row bg-white border mr-2 justify-between items-center sm:items-center lg:items-center space-y-4 lg:space-y-0 ${
        loading ? "" : ""
      }`}
    >
      {loading && <CircularProgress className="absolute z-10" />}
      {/* Product Image and Details */}
      <div className="flex flex-col sm:flex-row items-center lg:items-start ">
        <div className="w-[3rem] h-[3rem] lg:w-[7rem] lg:h-[5rem] border rounded-md p-2 shadow-orange-400">
          <img
            className="w-full h-full object-contain object-top rounded"
            src={prod.imageUrl}
            alt="product image"
          />
        </div>
        <div className="ml-4 space-y-2 text-center lg:text-left CartItemTypographie">
          <div className="font-bold  text-base">
            <p>{prod.productName}</p>
            <p className="text-xs opacity-80">
              <span>SKU:</span>
              {prod.sku}
            </p>
          </div>
          <div className="font-semibold text-sm flex space-x-1">
            {prod.variantType === "NONE" ? (
              <span>Produit standard</span>
            ) : (
              <>
                {prod.variantType === "SIZE" && `Taille: ${prod.selectedSize}`}
                {prod.variantType === "COLOR" &&
                  `Couleur: ${prod.selectedColor}`}
                {prod.variantType === "COLOR_AND_SIZE" &&
                  `Couleur: ${prod.selectedColor} | Taille: ${prod.selectedSize}`}
              </>
            )}
          </div>
          <p className="opacity-80">Vendeur : Moukit Fashion Store</p>
        </div>
      </div>
      {/* Modification de la section des prix */}

      <div className="flex flex-col items-center lg:items-start space-y-2 lg:space-y-1">
        <p className="text-sm font-bold opacity-90 text-green-900 Cart-infos">
          PRIX : {prod.unitPrice?.toFixed(2)} F CFA
        </p>

        {prod.additionalPrice > 0 && (
          <p className="text-green-900 text-sm font-semibold">
            Supplément variante : +{prod.additionalPrice?.toFixed(2)} F CFA
          </p>
        )}

        <p className="text-sm font-bold text-green-700">
          Total : {prod.totalPrice?.toFixed(2)} F CFA
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
          <span className=" rounded-md">
            <CancelPresentationIcon className="text-red-500" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
