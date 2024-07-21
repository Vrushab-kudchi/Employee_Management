import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerUser } from "../service/api";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessages = error?.errors[0]?.msg;
      setRegistrationError(errorMessages);
    }
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        bgcolor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper sx={{ padding: 5, maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center">
            Register
          </Typography>
          {registrationError && (
            <Alert severity="error">{registrationError}</Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("userName", { required: "Username is required" })}
              error={!!errors.userName}
              helperText={errors.userName ? errors.userName.message : ""}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginY: 2 }}
            >
              Register
            </Button>
          </form>
          <Typography align="center">
            Already have an account?{" "}
            <MuiLink href="/login">Back to Login</MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default RegistrationPage;
