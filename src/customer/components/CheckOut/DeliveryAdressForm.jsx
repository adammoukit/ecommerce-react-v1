import React from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createOrder, createPayGatePayment } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";

const DeliveryAdressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAdress"),
      city: data.get("city"),
      zipCode: data.get("postalCode"),
      state: data.get("state"),
      mobile: data.get("phoneNumber"),
    };
    const orderData = { address, navigate };
    // dispatch(createPayGatePayment(orderData))
    dispatch(createOrder(orderData));
    console.log("adress", orderData);
  };
  return (
    <div className="w-full mb-10 px-4 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Section Address Card */}
        <div className="border rounded-md shadow-md h-auto lg:h-[30.5rem] overflow-y-scroll p-5">
          <AddressCard />
          <div className="mt-4">
            <Button
              variant="contained"
              className="w-full text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Deliver Here
            </Button>
          </div>
        </div>

        {/* Section Form */}
        <div className="border md:col-span-2 lg:col-span-2 rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            {/* Changez la disposition de la grille */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  label="First Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="given-name"
                />
              </div>
              <div className="col-span-2 sm:col-span-1 ">
                <TextField
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  label="Last Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="family-name"
                />
              </div>
              {/* Ajoutez d'autres champs ici si nécessaire */}
              <div className="col-span-2">
                <TextField
                  id="outlined-multiline-static"
                  label="Address"
                  name="streetAdress"
                  multiline
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  type="text"
                  id="city"
                  name="city"
                  required
                  label="City"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="address-level2"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  type="text"
                  id="state"
                  name="state"
                  required
                  label="State"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="address-level1"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  label="ZIP / Postal Code"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="postal-code"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <TextField
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  label="Phone Number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="tel"
                />
              </div>
              <div className="col-span-2">
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                  type="submit"
                  className="w-full"
                >
                  Deliver Here
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAdressForm;
