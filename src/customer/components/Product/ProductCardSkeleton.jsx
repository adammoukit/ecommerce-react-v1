import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="productCard w-[15rem] sm:w-[12rem] transition-all cursor-pointer rounded-lg animate-pulse">
      {/* Image Placeholder */}
      <div className="h-[12rem] p-2">
        <div className="h-full w-full bg-gray-300 rounded-lg"></div>
      </div>

      {/* Text Section */}
      <div className="textPart flex flex-col gap-2 border-t-2 w-full p-1">
        <div className="flex items-center w-full justify-between">
          <div className="bg-red-300 h-5 w-10 rounded-sm"></div>
          <div className="bg-red-200 h-4 w-20"></div>
        </div>
        <div>
          <div className="bg-gray-300 h-4 w-24 rounded"></div>
          <div className="bg-gray-200 h-3 w-32 mt-2 rounded"></div>
        </div>
        <div className="flex space-x-2 justify-between items-center text-xs">
          <div className="bg-red-300 h-6 w-20 rounded"></div>
          <div className="bg-gray-200 h-4 w-16 rounded"></div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="flex items-center justify-between mt-2">
        <div className="bg-gray-200 h-5 w-24 rounded"></div>
        <div className="bg-gray-300 h-4 w-6 rounded-full"></div>
        <div className="bg-gray-200 h-4 w-4 rounded-full"></div>
      </div>

      {/* Button Section */}
      <div className="p-1 flex justify-center items-center mt-2 space-x-2">
        <div className="bg-yellow-300 h-8 w-full rounded-2xl"></div>
        <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
