Here's a complete `README.md` file for your [MERN Ecommerce project](https://mern-ecommerce-three-kappa.vercel.app):

---

```md
# 🛍️ MERN Ecommerce

A full-stack ecommerce web application built with the MERN stack (MongoDB, Express, React, Node.js). Includes authentication, product management, cart functionality, and an admin dashboard.

🔗 **Live Demo**: [mern-ecommerce-three-kappa.vercel.app](https://mern-ecommerce-three-kappa.vercel.app)

---

## 🚀 Tech Stack

**Frontend**:
- React (Vite)
- Redux Toolkit
- Tailwind CSS
- React Router
- Axios

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Bcrypt.js
- CORS & dotenv

---

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT-based protected routes
- Admin-only product controls

### 🛒 Ecommerce
- Product listing and detail pages
- Add to cart and checkout flow
- Quantity control and cart UI
- Price calculation

### ⚙️ Admin Dashboard
- Add / update / delete products
- Secure route protection

---

## 📁 Folder Structure

```

/client         → React frontend
/server         → Node.js backend

````

---

## ⚙️ Setup & Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Eslam-shaban/mern-ecommerce.git
cd mern-ecommerce
````

### 2. Environment Variables

#### `/server/.env`

```
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```

#### `/client/.env`

```
VITE_SERVER_URL=http://localhost:5000
```

### 3. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run Project

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

---

## 📸 Screenshots

> Add UI screenshots for:
>
> * Homepage
> * Product page
> * Admin dashboard
> * Mobile view (optional)

---

## 📦 Deployment

* **Frontend**: Deployed on [Vercel](https://vercel.com)
* **Backend**: Deploy using [Render](https://render.com) or [Railway](https://railway.app)

---

## 🙋‍♂️ Author

**Eslam Shaban**
🔗 [GitHub](https://github.com/Eslam-shaban)

---

## 📄 License

This project is licensed under the MIT License.

```

---

Let me know if you want:
- Arabic version  
- README with badges  
- Instructions for uploading images or deploying backend
```
