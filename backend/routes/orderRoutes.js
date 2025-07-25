import express from "express";
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrderById,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Order (User must be logged in)
router.post('/', protect, createOrder);

// Get User's Order by User Id
router.get('/user/:userId', protect, getUserOrders);

// Get Order by id
router.get("/:id", protect, getOrderById);

// Get All Orders (Admin only)
router.get("/", protect, isAdmin, getAllOrders);

// Update Order to Paid
router.put('/:id/pay', protect, updateOrderToPaid);

// Udate order to Delivered (Admin only)
router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered);

export default router;
