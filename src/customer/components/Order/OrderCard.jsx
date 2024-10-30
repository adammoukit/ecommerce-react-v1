import React from "react";
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate()
  return (
    <div onClick={()=> navigate(`/account/order/${5}`)} className=" flex justify-between p-3 cursor-pointer border rounded-sm shadow-lg hover:shadow-xl">
      <div className="flex items-center">
        <img
          className="w-[5rem] h-[5rem] object-cover object-top cursor-pointer"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8XoNrqOaaJGV_mQVU5e0RGU59Uook6XYMw&s"
          alt=""
        />
        <div className="ml-3 flex flex-col">
          <p className="font-semibold">PAULA'S CHOICE</p>
          <span className="text-sm text-gray-700 opacity-60">Size: L</span>
          <span className="text-sm text-gray-700 opacity-60">Color: Black</span>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold"> 1,500 CFA</p>
      </div>
      <div>
        {true && (
          <div>
            <p>
            <AdjustIcon sx={{width: "20px", height: "20px"}} className="text-green-800 text-sm mr-3"/>
            <span>Delivered on march 03</span>
          </p>
          <p className="text-xs font-medium opacity-70">Your item has been delivered</p>
          </div>
        )}
        {false && (
          <p>
            <span>Expected delivered on march 03</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
