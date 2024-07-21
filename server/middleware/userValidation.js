import { body, validationResult } from "express-validator";
import User from "../models/User.js"; // Update with your actual User model path

// Validation rules for user registration
export const validateRegisterUser = [
  body("userName")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (userName) => {
      const user = await User.findOne({ userName });
      if (user) {
        throw new Error("Username already exists");
      }
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation rules for user login
export const validateLoginUser = [
  body("userName").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
