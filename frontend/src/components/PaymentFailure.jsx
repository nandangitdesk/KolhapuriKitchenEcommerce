import React from "react";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
  return (
    <div>
      <h1>Payment Failed</h1>
      <p>There was an issue processing your payment. Please try again.</p>
      <Link to="/cart">Return to Checkout</Link>
    </div>
  );
};

export default PaymentFailure;
