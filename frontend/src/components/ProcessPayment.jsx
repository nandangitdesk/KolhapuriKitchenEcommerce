import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../components/layouts/MetaData";
import { Typography } from "@mui/material";
import axios from "axios";




const ProcessPayment = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  

  const [loading, setLoading] = useState(false);

 


  const handlePayment = async () => {
    setLoading(true);
    console.log(orderInfo);
    try {
      console.log("Sending request to:", "/api/v1/process/payment");
      const response = await axios.post("/api/v1/process/payment", {
        amount: orderInfo.totalPrice,
        email: user.email,
        phone: user.phone,
        name: user.name,
      });
      console.log("Response:", response.data);
      
      const paymentData = response.data;
      console.log(paymentData);

      const payuForm = document.createElement("form");
      payuForm.setAttribute("method", "post");
      payuForm.setAttribute("action", paymentData.action);

      Object.keys(paymentData.params).forEach((key) => {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", paymentData.params[key]);
        payuForm.appendChild(hiddenField);
      });

      document.body.appendChild(payuForm);
      payuForm.submit();

       // Redirect to success page after payment
    } catch (error) {
      console.error("Error processing payment:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      alert("There was an issue processing your payment.");
      setLoading(false);
    }
  };

 

  return (
    <>
      <MetaData title="Process Payment" />
      <div className="processPaymentPage px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <Typography variant="h4" className="font-bold mb-4">
          Payment
        </Typography>
        <button
          className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg w-full hover:bg-blue-700 transition-all text-sm sm:text-base"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </>
  );
};

export default ProcessPayment;
