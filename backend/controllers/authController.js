import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

// @desc    Create new user
// @route   POST /api/register/
// @access  (Public)
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // --------first way to validate the email and password---------
        //  // Email validation using regex
        //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //  if (!emailRegex.test(email)) {
        //      return res.status(400).json({ success: false, message: "Invalid email format" });
        //  }

        //  // Password validation (at least 8 chars, 1 uppercase, 1 number, 1 special character)
        //  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        //  if (!passwordRegex.test(password)) {
        //      return res.status(400).json({
        //           success: false, message: "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
        //      });
        //  }

        // Check if user already exists

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ success: false, message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Stored but not returned
            isAdmin: isAdmin || false,
        });
        const token = jwt.sign({ userId: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" })

        // Store token in HttpOnly cookie (more secure)
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production", // Only for HTTPS in production
        //     sameSite: "Strict",
        // });

        // Send only necessary user data in response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            // token: token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: token,
                // Send token with user data
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// @desc    Login user
// @route   POST /api/login/
// @access  (Public)
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exist
        const user = await User.findOne({ email });
        // console.log(user)
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" })

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" })

        // Store token in HttpOnly cookie (more secure)
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production", // Only for HTTPS in production
        //     sameSite: "Strict",
        // });

        res.status(200).json({
            success: true, message: "Login successful",
            // token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: token, // Send token with user data
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// @desc    Get All Users
// @route   GET /api/users/
// @access  (Admin Only)
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Default to page 1 and limit 10
        const skip = (page - 1) * limit;
        const users = await User.find().select("-password")
            .skip(skip)
            .limit(Number(limit));

        const totalUsers = await User.countDocuments();
        if (!users.length) {
            return res.status(404).json({ success: false, message: "No users found" });
        }
        const totalPages = Math.ceil(totalUsers / limit);

        // console.log(users[0])
        res.status(200).json({
            success: true,
            users,
            pagination: {
                currentPage: Number(page),
                totalPages,
                totalUsers,
                limit: Number(limit),
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
// @desc    Get User profile
// @route   GET /api/users/profile"
// @access  (logged-in user Only)
export const getUserProfile = async (req, res) => {
    try {
        // console.log('profile', req.user.id);
        // console.log('profile', req.user._id);
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        // console.log(user)
        if (!user)
            return res.status(404).json({ success: false, message: "User not found" })
        const safeUser = {
            id: user._id.toString(), // convert ObjectId to string
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        res.status(200).json({ success: true, user: safeUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// @desc    Change User password
// @route   PUT /api/users/change-password"
// @access  (logged-in user Only)
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Old password is incorrect." })

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const newhashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newhashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error in changePassword:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};
// @desc    Delete user
// @route   DELETE /api/users/"
// @access  (Admin Only)
export const DeleteUser = async (req, res) => {
    const id = req.params.id;
    // Validate MongoDB ObjectID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            error: "Invalid User ID"
        });
    }
    try {
        const user = await User.findById(id);
        if (!user)
            return res.status(400).json({ success: false, message: "user not found" });
        await user.deleteOne();
        res.status(200).json({ success: true, message: "user deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

    }


}
// 1st way
// if we using cookies instead of localStorage
// export const logoutUser = async (req, res) => {
//     res.cookie("token", "", { expires: new Date(0) });
//     res.status(200).json({ success: true, message: "Logged out successfully" });
// };
// or 2nd way
// export const logoutUser = async (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Strict",
//   });
//   res.status(200).json({ success: true, message: "Logged out" });
// };
