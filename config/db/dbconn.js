import mongoose from "mongoose";

export const dbConn = async () => {  
    
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb is connected with ${connection.host}`);
};