// utils/deleteOrders.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config({ path: "../.env" }); // Load .env BEFORE using process.env

const deleteAllOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        await Order.deleteMany({});
        console.log("✅ All orders deleted.");

        await mongoose.connection.close();
        console.log("✅ Connection closed");
    } catch (error) {
        console.error("❌ Error while deleting orders:", error);
        process.exit(1);
    }
};

deleteAllOrders();
