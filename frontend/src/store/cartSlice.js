import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cartItems.find(item => item._id === product._id);
            const currentQuantity = existingItem ? existingItem.quantity : 0;

            // Check stock limit
            if (currentQuantity >= product.stock) {
                // Optional: return a flag to handle toast outside
                state.error = `Cannot add more than ${product.stock} of ${product.name}.`;
                return;
            }

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...product, quantity: 1 });
            }

            state.error = null; // reset any previous error
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cart");
        },

    },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;