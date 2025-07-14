import express from 'express';
import { createPaymentIntent } from '../controllers/stripeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;
