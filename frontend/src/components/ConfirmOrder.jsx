import React from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../components/layouts/MetaData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const ConfirmOrder = () => {
  const navigate = useNavigate();  
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
   

  


  return (
    <>
      <div className="mt-16 sm:mt-20">
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />

        <div className="confirmOrderPage px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Info Section */}
            <div className="space-y-8">
              <div className="confirmShippingArea bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="font-bold mb-4">
                  Shipping Info
                </Typography>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-600 font-medium">Name:</p>
                    <span className="text-gray-800">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 font-medium">Phone:</p>
                    <span className="text-gray-800">{shippingInfo?.phoneNo}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <p className="text-gray-600 font-medium">Address:</p>
                    <span className="text-gray-800 text-right">{address}</span>
                  </div>
                </div>
              </div>

              {/* Cart Items Section */}
              <div className="confirmCartItems bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md">
                <Typography variant="h6" className="font-bold mb-4">
                  Your Cart Items
                </Typography>
                <div className="confirmCartItemsContainer space-y-4 mt-2">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div
                        key={item.product}
                        className="flex items-center justify-between flex-wrap gap-2"
                      >
                        <img
                          src={item.image}
                          alt="Product"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                        <span className="text-gray-800">
                          {item.quantity} X ₹{item.price} ={" "}
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="orderSummary bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md h-fit">
              <Typography variant="h6" className="font-bold mb-4">
                Order Summary
              </Typography>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal:</p>
                  <span className="text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Shipping Charges:</p>
                  <span className="text-gray-800">₹{shippingCharges}</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">GST:</p>
                  <span className="text-gray-800">₹{tax}</span>
                </div>
              </div>

              <div className="orderSummaryTotal flex justify-between mt-6 border-t border-gray-300 pt-4">
                <p className="text-lg font-bold">Total:</p>
                <span className="text-lg font-bold">₹{totalPrice}</span>
              </div>

              <button
                className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition-all text-sm sm:text-base"
                onClick={proceedToPayment}
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;