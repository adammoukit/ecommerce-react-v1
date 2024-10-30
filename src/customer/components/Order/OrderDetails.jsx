import React from "react";
import OrderTraker from "./OrderTraker";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddressCard from "../AddressCard/AddressCard";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 mt-5 mb-7">
      <div className="space-y-3">
        <h1 className="font-bold text-lg">Order Details</h1>
        <AddressCard  />
      </div>
      <div className="py-3">
        <OrderTraker activeStep={3} />
      </div>
      <div className="flex flex-col space-y-5">
        {[1, 1, 1, 1, 1].map((item) => (
          <div className="flex w-full shadow-xl rounded-md p-5 border items-center justify-between">
            {/* Section gauche (Image et informations du produit) */}
            <div className="flex items-start">
              <img
                className="w-[5rem] h-[5rem] object-cover object-top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jvcKdlfb9_PaFE1zNEKKjcxQQt_Ei8H5fg&s"
                alt="Product"
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">Product Name</h2>
                <p className="text-sm text-gray-500 font-semibold">
                  <span>Color: Pink</span> <span>Size: L</span>
                </p>
                <p className="text-sm text-gray-500 opacity-85 font-semibold">
                  Vendeur: Guillaume
                </p>
                <p className="text-2xl text-gray-500 font-semibold">
                  Prix: 1,900 CFA
                </p>
              </div>
            </div>

            {/* Section droite (Étoile et évaluation) */}
            <div className="flex flex-col items-center text-deepPurple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-deepPurple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
              <p className="text-sm">Rate & Review product</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

