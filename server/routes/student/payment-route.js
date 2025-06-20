const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const razorpay = require("../../helpers/razorpayInstance");
const { sendPaymentConfirmationMail } = require("../../helpers/mailer");
const User = require("../../models/User"); // import User model

// ✅ Create order (auto-capture enabled)
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// ✅ Verify payment and send confirmation email
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, regNo } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Fetch user by regNo
    const user = await User.findOne({ regNo });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Send confirmation email
    await sendPaymentConfirmationMail(user, razorpay_order_id, razorpay_payment_id, amount);

    res.status(200).json({ success: true, message: "Payment verified and email sent" });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

// ✅ Optional Success Page
router.get("/success", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Payment Successful</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f0f9f5; text-align: center; padding: 80px; }
          .box { background: white; padding: 40px; border-radius: 12px; display: inline-block; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { color: #2e7d32; }
          p { color: #555; }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>✅ Payment Successful!</h1>
          <p>Thank you for registering for the event.</p>
          <p>You may now close this window.</p>
        </div>
      </body>
    </html>
  `);
});

module.exports = router;
