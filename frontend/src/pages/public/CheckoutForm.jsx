import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import Button from "../../components/Button";

const CheckoutForm = ({ clientSecret, orderId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            setError(result.error.message);
            console.error("Payment Error:", result.error);
            toast.error(`❌ ${result.error.message}`);
            elements.getElement(CardElement).clear();
        } else {
            if (result.paymentIntent.status === "succeeded") {
                elements.getElement(CardElement).clear();
                toast.success("🎉 Payment successful!");

                try {
                    await API.put(`/orders/${orderId}/pay`);
                } catch (error) {
                    console.error("Failed to mark order as paid:", error);
                    toast.error("⚠️ Payment succeeded but failed to update order.");
                }
                dispatch(clearCart());
                // localStorage.removeItem("cart");
                navigate(`/order/${orderId}`);
            }
        }

        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                options={{
                    style: { base: { fontSize: "16px" } },
                    hidePostalCode: true,
                }}
                className="border p-4 rounded"
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button
                className="primary-btn cursor-pointer"
                isSubmit={true}
                isDisabled={!stripe || loading}
            >
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
};

export default CheckoutForm;
