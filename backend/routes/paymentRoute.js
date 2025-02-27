const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { isAuthenticatedUser } = require("../middleware/auth");
const orderModel = require("../models/orderModel");



router.post("/process/payment", isAuthenticatedUser ,  (req, res) => {
  
  try {
    const { amount, email, phone, name } = req.body;
    console.log("Received payment request:", { amount, email, phone, name });

    const payuConfig = {
      key: process.env.PAYU_MERCHANT_KEY,
      salt: process.env.PAYU_MERCHANT_SALT,
      txnid: crypto.randomBytes(16).toString("hex"),
      amount,
      productinfo: "Order Payment",
      firstname: name,
      email,
      phone,
      surl: `https://bookland-2tkd.onrender.com/api/v1/payment/success`,
      furl: "https://bookland-2tkd.onrender.com/api/v1/payment/failure",
    };

    const hashString = `${payuConfig.key}|${payuConfig.txnid}|${payuConfig.amount}|${payuConfig.productinfo}|${payuConfig.firstname}|${payuConfig.email}|||||||||||${payuConfig.salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    console.log("PayU Config:", payuConfig);
    console.log("Hash String:", hashString);
    console.log("Hash:", hash);

    res.status(200).json({
      action: "https://test.payu.in/_payment", // Test URL
      params: {
        ...payuConfig,
        hash,
      },
    });
  } catch (error) {
    console.error("Error in process/payment:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.post("/payment/success", async (req, res) => {
  try {
    console.log("Payment Success:", req.body);

    // Assuming PayU sends transaction details in the body
    const { txnid, status, amount, email } = req.body;

    // Check if the payment was successful
    if (status === "success") {
      // Process the successful payment
      // Update order status in your database (example using a hypothetical Order model)
      const order = await orderModel.findOne({ txnid });

      if (order) {
        order.status = "Paid"; // Update the order status
        await order.save(); // Save the updated order
      }

      console.log(`Order updated for txnid: ${txnid}`);

      // Redirect to the frontend success page
      return res.redirect(`https://bookland-2tkd.onrender.com/payment/success?txnid=${txnid}`);
    } else {
      console.log("Payment failed or pending.");
      return res.redirect("https://bookland-2tkd.onrender.com/payment/failure");
    }
  } catch (error) {
    console.error("Error in payment success handling:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/payment/failure", (req, res) => {
  console.log("Payment Failure:", req.body);
  // Handle the failed payment
  // Update order status in your database
  res.redirect("https://bookland-2tkd.onrender.com/payment/failure");
});

module.exports = router;
