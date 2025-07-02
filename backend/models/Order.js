import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            images: [String],
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: "pending" }, // "pending", "paid", "failed"
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
},
    { timestamps: true }

)

export default mongoose.model("Order", orderSchema);