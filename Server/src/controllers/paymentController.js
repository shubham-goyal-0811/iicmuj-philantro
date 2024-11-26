import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Donation } from "../models/donation.model.js";
import crypto from "crypto";


const mockDatabase = {
    orders: {},
    payments: {}
};

// Generate unique IDs
const generateOrderId = () => `order_${crypto.randomBytes(10).toString("hex")}`;
const generatePaymentId = () => `pay_${crypto.randomBytes(10).toString("hex")}`;


export const createOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    const ngoId = req.params?.id;
    if (!ngoId) {
        throw new ApiError(400, "Please select an NGO to donate");
    }

    if (!amount) {
        throw new ApiError(400, "Amount is required");
    }

    // Generate a mock order ID and save it to mock database
    const orderId = generateOrderId();
    const order = {
        id: orderId,
        amount,
        ngoId,
        status: "created",
        createdAt: Date.now()
    };

    mockDatabase.orders[orderId] = order;

    return res.status(200).json(
        new ApiResponse(200, { orderId, amount, ngoId }, "Order created successfully")
    );
});

/**
 * Complete a payment for an order
 */
export const completePayment = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    if (!orderId || !mockDatabase.orders[orderId]) {
        throw new ApiError(404, "Order not found");
    }

    const order = mockDatabase.orders[orderId];

    // Generate a mock payment ID and mark the order as paid
    const paymentId = generatePaymentId();
    const signature = crypto
        .createHmac("sha256", "mock_secret_key") // This is a mock secret key
        .update(orderId + "|" + paymentId)
        .digest("hex");

    const payment = {
        id: paymentId,
        orderId,
        status: "paid",
        signature,
        createdAt: Date.now()
    };

    // Mark the order as paid in the mock database
    mockDatabase.payments[paymentId] = payment;
    mockDatabase.orders[orderId].status = "paid";

    // Save the donation details to the database
    const donation = await Donation.create({
        ngoId: order.ngoId,
        userId: req.user._id, // Extracted from JWT
        amount: order.amount
    });

    // Update the user record with the donation reference
    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { donation: donation._id } },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            { payment, donation,user },
            "Payment completed and donation saved successfully"
        )
    );
});

/**
 * Verify a payment's signature
 */
export const verifyPayment = asyncHandler(async (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    if (!orderId || !paymentId || !signature) {
        throw new ApiError(400, "Order ID, Payment ID, and Signature are required");
    }

    const payment = mockDatabase.payments[paymentId];

    if (!payment || payment.orderId !== orderId) {
        throw new ApiError(404, "Payment not found or mismatched order");
    }

    // Generate the expected signature to verify
    const expectedSignature = crypto
        .createHmac("sha256", "mock_secret_key")
        .update(orderId + "|" + paymentId)
        .digest("hex");

    if (expectedSignature !== signature) {
        throw new ApiError(400, "Invalid Payment Signature");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Payment verified successfully")
    );
});
