import React, { useEffect } from "react";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import AddressCard from "../AddressCard/AddressCard";

const OrderSummaryForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const order = useSelector((store) => store.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCheckout = () => {
    const totalOrderPrice = order?.order?.totalDiscountedPrice;
    console.log("total Price: ", totalOrderPrice);
    navigate({ search: `step=4&order_id=${11}` });
  };

  return (
    <div>
      <div>
        <AddressCard addresses={order.order?.shippingAddress} />
      </div>
      <div>
        <div className="sm:grid grid-cols-3 lg:px-6 relative gap-3 mt-5 ">
          <div className="col-span-2 space-y-2 pb-4">
            {order.order?.orderItems?.map((item) => (
              <CartItem key={item.id} prod={item} />
            ))}
          </div>
          <div className=" rounded-sm p-2 h-[100vh] border">
            <div className="border p-2 space-y-1">
              <p className="text-lg font-bold opacity-60">Cart Title</p>
              <hr />
              <div className="flex justify-between font-bold pt-2 text-black">
                <span className="text-lg opacity-70">Price</span>
                <span className="">{order.order?.totalPrice} CFA</span>
              </div>
              <div className="flex justify-between font-bold pt-2 text-black">
                <span className="text-lg opacity-70">Discount</span>
                <span className="text-green-600">
                  -{order.order?.discounte} CFA
                </span>
              </div>
              <div className="flex justify-between font-bold pt-2 text-black">
                <span className="text-lg opacity-70">Delivery Charge</span>
                <span className="text-green-700">Free</span>
              </div>
              <div className="flex justify-between font-bold pt-2 text-black">
                <span className="text-lg opacity-70">Total Amount</span>
                <span className="text-green-600">
                  {order?.order?.totalDiscountedPrice} CFA
                </span>
              </div>
              <hr />
              <Button
                variant="contained"
                onClick={handleCheckout}
                className="mt-5 w-full"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryForm;
