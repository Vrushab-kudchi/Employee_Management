import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register a new user
export const registerUser = async (req, res) => {
  const { userName, password } = req.body;

  // Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ userName, password });

    // Save the user
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  // Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find user
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = user.generateAuthToken();

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user", error });
  }
};
