import { validationResult } from "express-validator";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import path from "path";
import fs from "fs";

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    const userId = req.user._id;
    const image = req.file
      ? { url: req.file.path, public_id: req.file.filename }
      : null;

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses: courses || [], // Default to empty array if not provided
      image,
      user: userId,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// Get all employees for the logged-in user
export const getAllEmployees = async (req, res) => {
  const userId = req.user._id;

  try {
    const employees = await Employee.find({ user: userId });
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// Get an employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const employee = await Employee.findOne({ _id: id, user: userId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Error fetching employee", error });
  }
};

// Update an employee by ID
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file;
  const userId = req.user._id;

  // Validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updateData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: image
        ? {
            url: `/uploads/${image.filename}`,
            public_id: image.filename,
          }
        : undefined,
    };

    const updatedEmployee = await Employee.findOneAndUpdate(
      { _id: id, user: userId },
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// Delete an employee by ID
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const deletedEmployee = await Employee.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { employees: id } });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee", error });
  }
};
