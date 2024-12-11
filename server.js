
import app from "./app.js";
import Razorpay from "razorpay";
import { dbConn } from "./config/db/dbconn.js";

dbConn()

console.log(process.env.PORT);

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 4000")
})