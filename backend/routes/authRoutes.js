import express from 'express';

import { registerUser, loginUser, getAllUsers, getUserProfile, changePassword, DeleteUser } from '../controllers/authController.js';
import { isAdmin, protect } from '../middlewares/authMiddleware.js';
import { validateChangePassword, validateLogin, validateRegister } from '../middlewares/validationUser.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser)
router.post('/login', validateLogin, loginUser)

// if we using cookies instead of localStorage
// router.post("/logout", logoutUser);


// route to get all users(Admin only)
router.get("/", protect, isAdmin, getAllUsers);
// each user can view his profile
router.get("/profile", protect, getUserProfile);
// change user password (logged-in user only)
router.put("/change-password", protect, validateChangePassword, changePassword);
// Delete user (admin only)
router.delete("/:id", protect, isAdmin, DeleteUser);

export default router;