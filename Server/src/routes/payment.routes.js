import express from "express";
import { completePayment, createOrder, verifyPayment } from "../controllers/paymentController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order/:id", createOrder);       
router.post("/complete-payment", verifyJWT, completePayment); 
router.post("/verify-payment", verifyPayment);
export default router;