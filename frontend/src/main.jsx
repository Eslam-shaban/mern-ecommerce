import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SearchProvider>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </CartProvider>
        </SearchProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
