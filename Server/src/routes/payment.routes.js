import express from "express";
import { completePayment, createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order/:Id", createOrder);       
router.post("/complete-payment", completePayment); 
router.post("/verify-payment", verifyPayment);
export default router;