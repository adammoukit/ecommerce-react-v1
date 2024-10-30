import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const handleCheckout = () => {
    navigate("/checkout/?step=2");
  };
  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItems, cart.deleteCartItems]);

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-6 relative gap-3 mt-5 ">
        <div className="col-span-2 space-y-2 pb-4">
          {cart.cart?.cartItems?.map((item) => (
            <CartItem key={item.id} prod={item} />
          ))}
        </div>
        <div className=" rounded-sm p-2 h-[100vh] border">
          <div className="border p-2 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold opacity-60">Cart Title</p>
              <p>Items: {cart.cart?.totalItem}</p>
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
            <div className="flex justify-between font-bold pt-2 text-black">
              <span className="text-lg opacity-70">Delivery Charge</span>
              <span className="text-green-700">Free</span>
            </div>
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
              className="mt-4 w-full"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
