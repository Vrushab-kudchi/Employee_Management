import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { deleteEmployee } from "../service/api"; // Ensure this import is correct

const EmployeeList = ({ employees, fetchEmployees, handleEditEmployee }) => {
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Courses</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>
                {employee.image && (
                  <img
                    src={`http://localhost:5000/${employee.image.url}`}
                    alt={employee.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                )}
              </TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.mobile}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.courses.join(", ")}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEditEmployee(employee)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteEmployee(employee._id)}
                  color="secondary"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;
