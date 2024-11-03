import React from "react";

const AddressCard = ({ addresses }) => {
  return (
    <div className="mb-5 border p-2">
      <div className="space-y-3">
        <div>
          <p className="font-semibold">
            {addresses?.firstName}
            {" - "}
            {addresses?.lastName}
          </p>
          <p>
            {addresses?.addresse?.[0]?.city}, {addresses?.addresse?.[0]?.state},{" "}
            {addresses?.addresse?.[0]?.zipCode}
          </p>
        </div>
        <div>
          <p className="font-semibold"> Phone Number</p>
          <p>+228 91264085</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
