import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  DialogActions,
} from "@mui/material";
import { updateEmployee } from "../service/api";

const designationOptions = ["HR", "Manager", "Sales"];
const genderOptions = ["Male", "Female"];
const courseOptions = ["MCA", "BCA", "BSC"];

const EditEmployee = ({ employee, open, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        ...employee,
        courses: employee.courses || [],
      });
    }
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, value]
        : prev.courses.filter((course) => course !== value),
    }));
  };

  const handleImageChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
  };

  const handleUpdate = async () => {
    const updatedEmployee = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "courses") {
        formData.courses.forEach((course) => {
          updatedEmployee.append("courses[]", course);
        });
      } else if (key === "image" && formData.image) {
        updatedEmployee.append("image", formData.image);
      } else {
        updatedEmployee.append(key, formData[key]);
      }
    });

    try {
      await updateEmployee(employee._id, updatedEmployee);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          value={formData.name || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="mobile"
          label="Mobile No"
          value={formData.mobile || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Designation</InputLabel>
          <Select
            name="designation"
            value={formData.designation || ""}
            onChange={handleChange}
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
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
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
                    checked={formData.courses.includes(course)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={course}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Button variant="contained" component="label" fullWidth margin="normal">
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
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
