import React, { useEffect, useMemo } from "react";
import CartItem from "./CartItem";
import { Button, CircularProgress, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const loading = useSelector((state) => state.cart.loading);
  const jwt = useSelector((store) => store.auth.jwt)

  const handleCheckout = () => {
    navigate("/checkout/?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItems, cart.deleteCartItems]);

  useEffect(() => {
    dispatch(getCart());
  }, [jwt]);

  // Trier uniquement lorsque cart.cart.cartItems change
const sortedCartItems = useMemo(() => {
  return [...(cart.cart?.cartItems || [])].sort((a, b) => a.id - b.id);
}, [cart.cart?.cartItems]);
  return (
    <div className={`relative ${loading ? "opacity-50" : ""}`}>
      {/* Indicateur de chargement */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <CircularProgress />
        </div>
      )}

      <div className="lg:grid grid-cols-3 lg:px-6 gap-3 mt-5">
        <div className="col-span-2 space-y-2 pb-4">
          {sortedCartItems.map((item) => (
            <CartItem key={item.id} prod={item} />
          ))}
        </div>
        <div className="Cart-infos  rounded-sm p-2 h-[100vh] border">
          <div className="border p-2 space-y-1">
            <div className="flex items-center justify-between bg-sky-300 px-2 py-1">
              <p className="text-lg font-bold  ">informations</p>
              <p>articles: {cart.cart?.totalItem}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold pt-2 text-black">
              <span className="text-lg opacity-70">Price</span>
              <span className="">{cart.cart?.totalPrice} CFA</span>
            </div>
            <div className="flex justify-between font-bold pt-2 text-black">
              <span className="text-lg opacity-70">Discount</span>
              <span className="text-green-600">{cart.cart?.discount} CFA</span>
            </div>
            <div className="flex justify-between font-bold pt-2  text-black">
              <span className="text-lg opacity-70">Delivery Charge</span>
              <span className="text-green-700">Free</span>
            </div>
            <Divider sx={{backgroundColor:"black", borderWidth:"1px"}}/>
            <div className="flex justify-between font-bold pt-2 text-black">
              <span className="text-lg opacity-70">Total Amount</span>
              <span className="text-green-600">
                {cart.cart?.totalDiscountedPrice} CFA
              </span>
            </div>
            <hr />
            <Button
              onClick={handleCheckout}
              variant="contained"
              className="mt-4 w-full font-bold"
              sx={{ bgcolor: "yellow", color: "black", fontWeight: 700 }}
            >
              Proceder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
