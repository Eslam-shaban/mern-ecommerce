# 🛍️ MERN Ecommerce

A full-stack ecommerce web app built with the MERN stack (MongoDB, Express, React, Node.js). It includes user authentication, product management, Stripe payment integration, profile management, and an admin dashboard.

🔗 **Live Demo**: [mern-ecommerce-three-kappa.vercel.app](https://mern-ecommerce-three-kappa.vercel.app)

---

## 🧰 Tech Stack

**Frontend**:

* React (Vite)
* Tailwind CSS
* Redux Toolkit
* React Router
* Axios
* Stripe Checkout

**Backend**:

* Node.js
* Express.js
* MongoDB (via Mongoose)
* JWT for Auth
* Bcrypt.js
* CORS, dotenv

---

## ✨ Features

### 🔐 Authentication

* Sign up, sign in, logout
* JWT-secured protected routes
* Role-based access (admin/user)

### 🛒 Ecommerce

* Product listing & search
* Product details page
* Add to cart / remove from cart
* Total price calculation
* Cart persistence

### 💳 Stripe Integration

* Stripe Checkout session for payment
* Automatic redirection after success/cancel
* Secure backend integration for payment session

### 👤 Profile Page

* View user profile info
* View order history
* Update user details (coming soon)

### ⚙️ Admin Dashboard

* Add new products
* Edit or delete products
* Role-protected access

---

## 📁 Folder Structure

```
mern-ecommerce/
├── client/ # React frontend
└── server/ # Express backend
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Eslam-shaban/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Configure Environment Variables

#### `server/.env`

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret (optional)
```

#### `client/.env`

```env
VITE_SERVER_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

---

## 📦 Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

---

## 🧪 Run Locally

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

Open [`http://localhost:5173`](http://localhost:5173) in your browser.

---

## 🚀 Deployment

* **Frontend** deployed on: [Vercel](https://vercel.com)
* **Backend** suggested options:

  * [Render](https://render.com)
  * [Railway](https://railway.app)
  * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📸 Screenshots

You can include these (add to `client/public/screenshots/`):

* Home Page
* Product Detail Page
* Cart Page
* Shipping Address Page
* Checkout Page
* Order Details Page
* Profile Page
* Admin Dashboard

Markdown for adding screenshots:


### Home Page
<img width="935" height="612" alt="Screenshot 2025-06-26 153530" src="https://github.com/user-attachments/assets/03df1dcb-369f-479f-982b-b4141dcfc8ac" />

### Product Detail Page
<img width="1316" height="757" alt="Screenshot 2025-06-26 153708" src="https://github.com/user-attachments/assets/442c746d-e2dc-43a2-9c77-21db926c2b0e" />


### Cart Page
<img width="1313" height="751" alt="Screenshot 2025-06-26 153812" src="https://github.com/user-attachments/assets/0d72f491-cd62-4b6f-8026-788e77443e5e" />


### Shipping Address Page
<img width="1772" height="836" alt="Screenshot 2025-07-29 194130" src="https://github.com/user-attachments/assets/10b22682-3a4f-4fc6-a8e0-1f8d3005e86e" />

### Checkout Page
<img width="1718" height="745" alt="Screenshot 2025-07-29 194157" src="https://github.com/user-attachments/assets/26fd92e5-8020-4224-a59e-7ba2f60ec5cb" />

### Payment Stripe Page
<img width="1655" height="748" alt="Screenshot 2025-07-29 194429" src="https://github.com/user-attachments/assets/b3cb5c16-553b-4611-85f9-7f2bbae07126" />


### Order Details Page
<img width="1501" height="847" alt="Screenshot 2025-07-29 194503" src="https://github.com/user-attachments/assets/09689443-a794-47ff-8e69-5081fb585d1b" />

### Profile Page
<img width="1664" height="820" alt="Screenshot 2025-07-29 194728" src="https://github.com/user-attachments/assets/33bab342-c6f5-46c7-bdaf-62074e6e4a6b" />


###  Admin Dashboard
<img width="1852" height="857" alt="Screenshot 2025-07-29 191035" src="https://github.com/user-attachments/assets/2bd9cf64-a406-4877-ad96-305bcba0394c" />


####  Edit Product Page
<img width="1595" height="791" alt="Screenshot 2025-07-29 191149" src="https://github.com/user-attachments/assets/963ea831-2eeb-4f53-acd5-f7d7d7634807" />


###  Add Product Page
<img width="1661" height="776" alt="Screenshot 2025-07-29 191206" src="https://github.com/user-attachments/assets/199d7bde-cd60-4b67-81f7-883c3c6b78a2" />

###  OrderList Page
<img width="1745" height="774" alt="Screenshot 2025-07-29 191234" src="https://github.com/user-attachments/assets/0045d25a-9135-4f0f-93e8-66137b4481d8" />


###  UsersList Page
<img width="1865" height="845" alt="Screenshot 2025-07-29 191300" src="https://github.com/user-attachments/assets/74b63860-93e4-41b9-808c-4e147dee3197" />

---

## 👨‍💻 Author

**Eslam Shaban**

* GitHub: [@Eslam-shaban](https://github.com/Eslam-shaban)

---

## 📝 License

This project is licensed under the MIT License.
