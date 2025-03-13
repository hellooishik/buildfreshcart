const Razorpay = require("razorpay");
const stripeKey = process.env.STRIPE_SECRET_KEY || 'dummy_key';
const stripe = require('stripe')(stripeKey);
const crypto = require("crypto");

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
    try {
      const { amount, currency } = req.body;
  
      console.log("🟢 Creating Razorpay Order with:", { amount, currency });
  
      const options = {
        amount: amount * 100, // Amount in paise (for INR)
        currency: currency || "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1,
      };
      
  
      console.log("🟢 Options Sent to Razorpay:", options);
  
      const order = await razorpay.orders.create(options);
      console.log("✅ Razorpay Order Created:", order);
  
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("🔥 Razorpay Order Error:", error.message);
      res.status(500).json({ message: "Failed to create Razorpay order", error: error.message });
    }
  };

// ✅ Verify Razorpay Payment
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify payment", error: error.message });
  }
};

// ✅ Stripe Payment
exports.createStripePayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethodId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents (USD)
      currency: currency || "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ message: "Failed to process Stripe payment", error: error.message });
  }
};
