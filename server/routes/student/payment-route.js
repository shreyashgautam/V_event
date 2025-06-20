const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const razorpay = require("../../helpers/razorpayInstance");

// ✅ Create order (auto-capture enabled)
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount, // Amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture enabled
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

// ✅ Verify payment signature
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

// ✅ Success route (optional confirmation after redirect)
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
