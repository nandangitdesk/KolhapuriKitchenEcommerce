import React, { useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, clearErrors } from "../actions/orderAction";
import { loadUser } from "../actions/userAction";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const orderCreated = useRef(false);

  const { error, success } = useSelector((state) => state.newOrder);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    const paymentInfo = new URLSearchParams(location.search);

    if (
      !orderCreated.current &&
      isAuthenticated &&
      user &&
      orderInfo &&
      cartItems &&
      shippingInfo
    ) {
      if (paymentInfo.get('txnid')) {
        const order = {
          shippingInfo: shippingInfo,
          orderItems: cartItems,
          itemsPrice: orderInfo.subtotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shippingCharges,
          totalPrice: orderInfo.totalPrice,
          user: user._id,
          paymentInfo: {
            id: paymentInfo.get('txnid'),
            status: "succeeded",
          },
        };

        console.log("Attempting to create order:", order);
        dispatch(createOrder(order));
        orderCreated.current = true;
      } else {
        console.error("Missing txnid in payment info");
      }
    }
  }, [dispatch, isAuthenticated, cartItems, shippingInfo, user, location.search, orderInfo]);

  useEffect(() => {
    if (success) {
      console.log("Order created successfully!");
      sessionStorage.removeItem("orderInfo");
      
    }
    if (error) {
      console.error("Error occurred:", error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-lg font-semibold mb-4">Payment Successful</p>
      <Link to="/orders" className="text-red-500 hover:text-red-700">View Orders</Link>
    </div>
  );
};

export default PaymentSuccess;