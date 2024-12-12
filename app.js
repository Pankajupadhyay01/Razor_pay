import express from 'express'
import dotenv from 'dotenv'
import router from './route/paymentRoute.js'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
app.get("/api/test", (req, res) =>
    res.status(200).json({ sucess: true, msg: "okok" })
);

app.use("/api", router)

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env" });
}


export default app;