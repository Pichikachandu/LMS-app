import express from "express";
import { enrollInCourse, verifyPayment } from "../controllers/orderController.js";

const paymentRouter = express.Router();

// Route for enrolling in free courses
paymentRouter.post("/enroll", enrollInCourse);

// Keep verifyPayment for backward compatibility, but it will return an error
paymentRouter.post("/verify-payment", verifyPayment);

export default paymentRouter;