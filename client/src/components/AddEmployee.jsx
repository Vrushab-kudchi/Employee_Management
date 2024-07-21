import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import { createEmployee } from "../service/api";

const designationOptions = ["HR", "Manager", "Sales"];
const genderOptions = ["Male", "Female"];
const courseOptions = ["MCA", "BCA", "BSC"];

const AddEmployee = ({ fetchEmployees }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });
  const [open, setOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRegistrationError(""); // Clear registration error when closing
  };

  const handleCreateEmployee = async () => {
    const formData = new FormData();
    formData.append("name", newEmployee.name);
    formData.append("email", newEmployee.email);
    formData.append("mobile", newEmployee.mobile);
    formData.append("designation", newEmployee.designation);
    formData.append("gender", newEmployee.gender);
    newEmployee.courses.forEach((course) => {
      formData.append("courses[]", course);
    });
    if (newEmployee.image) {
      formData.append("image", newEmployee.image);
    }

    try {
      console.log("Submitting form data:", formData); // Debugging log
      await createEmployee(formData);
      fetchEmployees();
      handleClose();
      setNewEmployee({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        image: null,
      });
    } catch (error) {
      console.error("Failed to create employee:", error);
      const errorMessages = error?.errors[0]?.msg || "Registration failed";
      setRegistrationError(errorMessages);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setNewEmployee((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, value]
        : prev.courses.filter((course) => course !== value),
    }));
  };

  const handleImageChange = (event) => {
    setNewEmployee((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Employee
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          {registrationError && (
            <Typography color="error" gutterBottom>
              {registrationError}
            </Typography>
          )}
          <TextField
            label="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile No"
            value={newEmployee.mobile}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, mobile: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Designation</InputLabel>
            <Select
              value={newEmployee.designation}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, designation: e.target.value })
              }
              label="Designation"
            >
              {designationOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              value={newEmployee.gender}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, gender: e.target.value })
              }
              label="Gender"
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" fullWidth margin="normal">
            <Typography variant="subtitle1">Courses</Typography>
            <FormGroup>
              {courseOptions.map((course) => (
                <FormControlLabel
                  key={course}
                  control={
                    <Checkbox
                      value={course}
                      checked={newEmployee.courses.includes(course)}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={course}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            fullWidth
            margin="normal"
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateEmployee} color="primary">
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEmployee;
