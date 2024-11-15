import express from "express";
import { initiatePayment, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", initiatePayment);   // Route to initiate payment
router.post("/verify", verifyPayment);       // Route to verify payment

export default router;