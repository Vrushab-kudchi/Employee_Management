import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { getAllEmployees } from "../service/api";
import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";
import EditEmployee from "../components/EditEmployee";

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = () => {
    fetchEmployees();
    handleCloseEditDialog();
  };

  return (
    <Container>
      <Typography variant="h4" paddingY={4}>
        Dashboard
      </Typography>
      <AddEmployee fetchEmployees={fetchEmployees} />
      <Typography variant="h6" paddingY={4}>
        Employee List
      </Typography>
      <EmployeeList
        employees={employees}
        fetchEmployees={fetchEmployees}
        handleEditEmployee={handleEditEmployee}
      />

      {selectedEmployee && (
        <EditEmployee
          employee={selectedEmployee}
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          onUpdate={handleUpdateEmployee}
        />
      )}
    </Container>
  );
};

export default DashboardPage;
