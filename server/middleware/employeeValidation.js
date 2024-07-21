import { body, validationResult } from "express-validator";
import Employee from "../models/Employee.js"; // Adjust the path as needed

// Validation rules for creating an employee
export const validateCreateEmployee = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const employee = await Employee.findOne({ email: value });
      if (employee) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("mobile")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isNumeric()
    .withMessage("Mobile number must be numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),

  body("designation")
    .notEmpty()
    .withMessage("Designation is required")
    .isString()
    .withMessage("Designation must be a string"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Invalid gender"),

  body("courses")
    .isArray()
    .withMessage("Courses must be an array")
    .notEmpty()
    .withMessage("Courses cannot be empty"),

  body("image")
    .optional()
    .custom((value, { req }) => {
      if (req.file) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(
          path.extname(req.file.originalname).toLowerCase()
        );
        const mimetype = filetypes.test(req.file.mimetype);

        if (!mimetype || !extname) {
          throw new Error("Only jpg/png files are allowed");
        }
      }
      return true;
    }),
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
