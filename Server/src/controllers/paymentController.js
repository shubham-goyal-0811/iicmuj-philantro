import { createRazorpayOrder } from "../services/razorpayService.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";

export const initiatePayment = asyncHandler(async (req, res) => {
    const { amount, ngoId } = req.body;

    if (!amount || !ngoId) {
        throw new ApiError(400, "Amount and NGO ID are required");
    }

    const order = await createRazorpayOrder(amount);
    return res.status(200).json(new ApiResponse(200, { order }, "Order created successfully"));
});

export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        throw new ApiError(400, "Invalid Payment Signature");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Payment verified successfully"));
});
