import React, { useEffect, useMemo } from "react";
import CartItem from "./CartItem";
import { Button, CircularProgress, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";
import "./Cart.css";
import PaymentIcon from "@mui/icons-material/Payment";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const loading = useSelector((state) => state.cart.loading);
  const jwt = useSelector((store) => store.auth.jwt);

  const handleCheckout = () => {
    navigate("/checkout/?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItems, cart.totalItem]);

  useEffect(() => {
    dispatch(getCart());
  }, [jwt]);

  // Trier uniquement lorsque cart.cart.cartItems change
  const sortedCartItems = useMemo(() => {
    return [...(cart.cart?.cartItems || [])].sort((a, b) => a.id - b.id);
  }, [cart.cart?.cartItems]);
  return (
    <div
      className={`relative bg-slate-100 p-5 ${loading ? "" : ""} h-[100vh]`}
      style={{ backgroundColor: "" }}
    >
      {/* Indicateur de chargement */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
          <CircularProgress />
        </div>
      )}

      <div className="lg:grid grid-cols-4 lg:px-6 gap-3 mt-5">
        <div className="col-span-3 space-y-2 pb-4 h-[500px] overflow-y-scroll">
          {/* Ligne d'en-tête */}
          <div className="hidden opacity-90 sm:grid grid-cols-[40%_30%_15%_15%] items-center bg-blue-600 text-white p-3 rounded-t-lg border-b">
            <span className="font-bold text-md text-center">Produit</span>
            <span className="font-bold text-md text-center">Prix</span>
            <span className="font-bold text-md text-center">Quantité</span>
            <span className="font-bold text-md text-center">Actions</span>
          </div>
          {sortedCartItems.map((item) => (
            <CartItem key={item.id} prod={item} loading={loading} />
          ))}
        </div>
        <div className="Cart-infos  rounded shadow-sm CiContainer bg-white p-2  h-[fit-content] ">
          <div className=" p-2 space-y-1">
            <div className="flex items-center justify-between bg-sky-300 px-2 py-1">
              <p className="text-lg font-bold  ">informations</p>
              <p>articles: {cart.cart?.totalItem}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold pt-2 text-black">
              <span className="text-md ">Prix</span>
              <span className="">{cart.cart?.totalPrice} CFA</span>
            </div>
            <div className="flex justify-between font-bold pt-2 text-black">
              <span className="text-md ">Réduction</span>
              {/* <span className="text-green-600">{cart.cart?.discount} CFA</span> */}
            </div>
            <div className="flex justify-between font-bold pt-2  text-black">
              <span className="text-md ">Frais de livraison</span>
              <span className="text-green-700">Free</span>
            </div>
            <Divider sx={{ backgroundColor: "black", borderWidth: "1px" }} />
            <div className="flex justify-between font-bold pt-2  text-black">
              <span className="text-lg ">Total</span>
              <span className="text-green-600">
                {cart.cart?.totalPrice} CFA
              </span>
            </div>
            <hr />
            <Button
              onClick={handleCheckout}
              variant="contained"
              className=" w-full   font-bold bg-"
              sx={{ bgcolor: "orange",  color: "white", fontWeight: 700 }}
            >
              <PaymentIcon style={{ marginRight: "10px" }} />
              Proceder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
