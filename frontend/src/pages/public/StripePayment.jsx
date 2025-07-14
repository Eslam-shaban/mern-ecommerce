import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import API from "../../api/axiosInstance";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // ✅ ضع المفتاح هنا

const StripePayment = () => {
    const { orderId } = useParams();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const createPayment = async () => {
            try {
                const { data } = await API.post("/stripe/create-payment-intent", {
                    amount: 1000,//
                });
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Stripe Payment Init Error:", error);
            }
        };

        createPayment();
    }, []);

    const appearance = {
        theme: "stripe",
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm clientSecret={clientSecret} orderId={orderId} />
                </Elements>
            )}
        </div>
    );
};

export default StripePayment;
