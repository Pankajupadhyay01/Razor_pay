import express from 'express'
import crypto from 'crypto'
import { instance } from '../server.js'
import { Payment } from '../models/paymentModal.js';
export const Checkout = async (req, res) => {
    try {
        const amountInRupees = Number(req.body.amount);

        const amountInPaise = Math.round(amountInRupees * 100);

        const options = {
            amount: amountInPaise,
            currency: "USD"
        };

        const orders = await instance.orders.create(options);

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}



export const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        res.redirect(
            `http://localhost:5173/`
        );
    } else {
        res.status(400).json({
            success: false,
        });
    }
};