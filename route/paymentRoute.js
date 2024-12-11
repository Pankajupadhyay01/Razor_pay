import express from "express";
import { Checkout, paymentVerification } from "../controller/paymentController.js";

const router = express.Router();


router.route('/checkout').post(Checkout)
router.route('/paymentverification').post(paymentVerification)
export default router;