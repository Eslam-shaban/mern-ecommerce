import Order from '../models/Order.js';
import Product from '../models/Product.js';


export const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;

        // console.log(orderItems);
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ success: false, message: "No items in the order" });
        }

        // Check stock availability
        for (const item of orderItems) {
            const product = await Product.findById(item.product);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ success: false, message: `${item.name} is out of stock.` });
            }
        }

        // Create order
        const order = new Order({
            user: req.user._id,
            shippingAddress,
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            paymentStatus: 'pending',
        });

        const createdOrder = await order.save();

        // Reduce stock immediately for COD
        if (paymentMethod === 'cash-on-delivery') {
            for (const item of orderItems) {
                const product = await Product.findById(item.product);
                product.stock -= item.quantity;
                await product.save();
            }
        }

        res.status(201).json({ success: true, createdOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get all orders (Admin only)
export const getAllOrders = async (req, res,) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const orders = await Order.find()
            .populate("user", "name email")
            .skip(skip)
            .limit(Number(limit));
        const totalOrders = await Order.countDocuments();
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        const totalPages = Math.ceil(totalOrders / limit);

        res.status(200).json({
            success: true,
            orders,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalOrders,
                limit: Number(limit),
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Get logged-in user's orders
export const getMyOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const orders = await Order.find({ user: req.user._id })
            .skip(skip)
            .limit(Number(limit));

        const totalOrders = await Order.countDocuments({ user: req.user._id });
        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        const totalPages = Math.ceil(totalOrders / limit);
        res.status(200).json({
            success: true,
            orders,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalOrders,
                limit: Number(limit),
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private (logged-in user or admin)
export const getOrderById = async (req, res) => {
    const id = req.params.id;

    // Optional: validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ success: false, message: "Invalid order ID" });
    }

    try {
        const order = await Order.findById(id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Only the order owner or an admin can access the order
        if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(403).json({ success: false, message: "Not authorized to view this order" });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


//  Update order to "Paid"
export const updateOrderToPaid = async (req, res) => {
    const id = req.params.id;
    // Validate MongoDB ObjectID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            error: "Invalid order ID"
        });
    }
    try {
        const order = await Order.findById(id);

        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        order.paymentStatus = "paid";

        if (order.paymentMethod !== 'cash-on-delivery') {
            for (const item of order.orderItems) {
                const product = await Product.findById(item.product);
                product.stock -= item.quantity;
                await product.save();
            }
        }

        const updatedOrder = await order.save();
        res.status(200).json({ success: true, updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//   Update order to "Delivered" (Admin only)
export const updateOrderToDelivered = async (req, res) => {
    const id = req.params.id;
    // Validate MongoDB ObjectID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            error: "Invalid order ID"
        });
    }
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ success: false, message: "Order not found" });

        order.isDelivered = true;
        const updatedOrder = await order.save();

        res.status(200).json({ success: true, updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};