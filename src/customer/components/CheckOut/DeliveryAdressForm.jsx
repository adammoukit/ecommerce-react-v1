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
    <div className="w-full mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Section Address Card */}
        <div className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll p-5">
          <AddressCard />
          <div>
            <Button
              variant="contained"
              className="mt-4   text-white py-2 rounded-md hover:bg-indigo-500"
            >
              Deliver Here
            </Button>
          </div>
        </div>

        {/* Section Form */}
        {/* Section Form */}
        <div className="border col-span-2 rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
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
              <div>
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
              {/* Ajoute d'autres champs ici si nécessaire */}
              <div className="col-span-2">
                <TextField
                  id="outlined-multiline-static"
                  label="address"
                  name="streetAdress"
                  multiline
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <TextField
                  type="text"
                  id="city"
                  name="city"
                  required
                  label="city"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="address-level2"
                />
              </div>
              <div>
                <TextField
                  type="text"
                  id="state"
                  name="state"
                  required
                  label="state"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="address-level1"
                />
              </div>
              <div>
                <TextField
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  label="zip / postal code"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  autoComplete="postal-code"
                />
              </div>
              <div>
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
              <div>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                  type="submit"
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
