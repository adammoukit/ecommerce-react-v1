import React from "react";
import OrderCard from "./OrderCard";

const Order = () => {
  const orderStatut = [
    { label: "On the way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "returned", value: "returned" },
    { label: "cancelled", value: "cancelled" },
  ];
  return (
    <div className="flex justify-between border mt-5 container mx-auto space-x-3 lg:px-7 mb-7">
      <div className="w-1/4 h-auto shadow-lg border bg-white space-y-4 p-5 sticky top-5">
        <h1 className="font-bold text-lg">Filter</h1>
        <div className="space-y-2">
          <h1 className="font-semibold">Order Status</h1>
          {orderStatut.map((option) => {
            return (
              <div className="flex items-center mb-2" key={option.value}>
                <input
                  type="checkbox"
                  defaultValue={option.value}
                  className="h-7 w-7 border-gray-600 focus:ring-indigo-600 text-indigo-800"
                />
                <label
                  htmlFor={option.label}
                  className="ml-3 font-semibold text-sm text-gray-500"
                >
                  {option.value}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-auto space-y-5">
        {[1, 1, 1, 1, 1].map((item) => (
          <OrderCard />
        ))}
      </div>
    </div>
  );
};

export default Order;
