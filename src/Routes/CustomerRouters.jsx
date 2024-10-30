import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/Pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Product from "../customer/components/Product/Product";
import OrderDetails from "../customer/components/Order/OrderDetails";
import ProductDetails from "../customer/components/productDetails/ProductDetails";
import CheckOut from "../customer/components/CheckOut/CheckOut";
import Order from "../customer/components/Order/Order";
import SuccessPage from "../customer/Pages/HomePage/SuccessPage";

const CustomerRouters = () => {
  return (
    <>
      <div></div>
      <Routes>
        <Route path="/login" element={<HomePage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:lavelOne/:lavelTwo/:lavelThre" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/success/:orderId" element={<SuccessPage />} />

        {/* <Order/> */}
        {/* <OrderDetails /> */}
      </Routes>
    </>
  );
};

export default CustomerRouters;
