import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import {
  validateRegisterUser,
  validateLoginUser,
} from "../middleware/userValidation.js";

const router = express.Router();

router.post("/register", validateRegisterUser, registerUser); // Register user with validation
router.post("/login", validateLoginUser, loginUser); // Login user with validation

export default router;
