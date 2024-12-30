import express from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

const router = express.Router();

// Validation Helper Function
const validateRequest = (req, res, next) => {
  const { phoneNumber, userName } = req.body;

  // Check for empty fields
  if (!phoneNumber || !userName) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  // Optionally add other validations (e.g., phone number format)
  if (!/^\d+$/.test(phoneNumber)||phoneNumber.length!=10) {
    return res.status(400).json({ message: "Invalid Phone Number " });
  }

  next(); // Proceed to the next middleware or route handler
};

// Sign-in Route
router.post('/sign-in', validateRequest, async (req, res) => {
  const { phoneNumber, userName,profileImage } = req.body;

  try {
    // Check if the phone number already exists
    const existingUser = await UserModel.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: "This phone number already exists" });
    }

    // Create a new user
    const newUser = new UserModel({ phoneNumber, userName ,profileImage });
    await newUser.save();

    return res.status(201).json({ message: "Sign-in Successful", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Login Route
router.post('/login', validateRequest, async (req, res) => {
  const { phoneNumber, userName } = req.body;

  try {
    const user = await UserModel.findOne({ phoneNumber, userName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      message: "Login successful",
      token,
      data: { id: user._id, userName: user.userName, profileImage: user.profileImage },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;
