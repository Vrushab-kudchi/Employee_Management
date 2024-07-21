import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import {
  validateCreateEmployee,
  handleValidationErrors,
} from "../middleware/employeeValidation.js";
import upload from "../config/multer.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create employee with file upload and validation
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  validateCreateEmployee,
  handleValidationErrors,
  createEmployee
);

// Get all employees for the logged-in user
router.get("/", authenticateToken, getAllEmployees);

// Get employee by ID
router.get("/:id", authenticateToken, getEmployeeById);

// Update employee with file upload and validation
router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  handleValidationErrors,
  updateEmployee
);

// Delete employee by ID
router.delete("/:id", authenticateToken, deleteEmployee);

export default router;
