import razorpay from "../config/razorpay.js";

export const createRazorpayOrder = async (amount) => {
    const options = {
        amount: amount * 100, // Razorpay takes amount in paise (e.g., ₹500 -> 50000 paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return order;
};
