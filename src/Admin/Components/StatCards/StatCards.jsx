import {
  DollarSignIcon,
  ShoppingCartIcon,
  PackageIcon,
  TrendingUpIcon,
} from "lucide-react";
import React from "react";
import SellingChart from "../Charts/SellingChart";
import DevicesPieChart from "../Charts/DevicesPieChart";

const StatCards = () => {
  // Configuration des différentes types de cartes
  const cardConfig = {
    revenue: {
      icon: "XOF",
      color: "text-green-500 bg-green-100",
      label: "Revenu Total",
      trendIcon: <TrendingUpIcon className="w-4 h-4" />,
    },
    orders: {
      icon: <ShoppingCartIcon />,
      color: "text-blue-500 bg-blue-100",
      label: "Commandes",
      trendIcon: <TrendingUpIcon className="w-4 h-4" />,
    },
    products: {
      icon: <PackageIcon />,
      color: "text-purple-500 bg-purple-100",
      label: "Produits Actifs",
      trendIcon: <TrendingUpIcon className="w-4 h-4" />,
    },
  };

  const Card = ({ type, value, trend }) => {
    const config = cardConfig[type];

    return (
      <div className="col-span-12   lg:col-span-4  md:col-span-6 bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              {config.label}
              {config.label === "Commandes" && (
                <span className="m-1 font-bold">{`(23)`}</span>
              )}
            </p>
            <p className="text-md lg:text-2xl font-bold opacity-80 text-gray-900">
              {value} XOF
            </p>
          </div>
          <div className={`rounded-full relative  p-3 ${config.color}`}>
            <span className="font-bold text-[20px]">
              {config.icon}
              {config.label === "Commandes" && (
                <div className="absolute -top-4 font-bold text-white -right-2 rounded-full bg-red-500 py-[2px] px-[5px] ">
                  23
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {config.trendIcon}
          <span
            className={`ml-2 ${trend > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {trend}% vs mois dernier
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-4  md:grid-cols-12 lg:grid-cols-12 gap-1">
      <Card type="revenue" value="12 254 000" trend={12.5} />
      <Card type="orders" value="3 128 400" trend={-2.1} />
      <Card type="products" value="543" trend={5.7} />
      <div className="col-span-12 pb-7 lg:pb-0  lg:col-span-8  bg-white rounded">
        <SellingChart />
      </div>
      <div className="col-span-12 lg:col-span-4 bg-white rounded">
        <DevicesPieChart />
      </div>
    </div>
  );
};

export default StatCards;
