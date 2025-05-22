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
import Store from "../customer/components/Product/Store";
import AccountLinkingPage from "../customer/components/Auth/AccountLinkingPage";
import LoginForm from "../customer/components/Auth/LoginForm";
import SignUpForm from "../customer/components/Auth/SignUpForm";

const CustomerRouters = () => {
  return (
    <>
      <div></div>
      <Routes>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/signup" element={<SignUpForm />} />
        
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:lavelOne/:lavelTwo/:lavelThre" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/account/order" element={<Order />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/success/:orderId" element={<SuccessPage />} />
        <Route path="/store" element={<Store />} />
        {/* <Route path="/store/:category" element={<Store />} /> */}
        {/* <Route path="/store/:category/:subCategory" element={<Store />} /> */}
        {/* <Route path="/store/:category/:subCategory/:subSubCategory" element={<Store />} /> */}
        {/* <Route path="/store/:category/:subCategory/:subSubCategory/:productId" element={<ProductDetails />} /> */}
        {/* <Route path="/store/:category/:subCategory/:subSubCategory/:productId/checkout" element={<CheckOut />} /> */}

        <Route path="/account-linking" element={<AccountLinkingPage />} />
        {/* <Order/> */}
        {/* <OrderDetails /> */}
      </Routes>
    </>
  );
};

export default CustomerRouters;
