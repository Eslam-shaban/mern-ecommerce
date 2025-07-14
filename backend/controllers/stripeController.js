import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {

    const { amount } = req.body; // amount in cents

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: {
                userId: req.user?._id?.toString(),
                email: req.user.email
            },
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
    catch (error) {
        console.error('Stripe Error:', error.message);
        res.status(500).json({ error: 'Payment failed' });
    }
};