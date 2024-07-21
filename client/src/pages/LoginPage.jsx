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
import { loginUser } from "../service/api";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        bgcolor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ padding: 5, maxWidth: 400, width: "100%", boxShadow: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" align="center">
            Login
          </Typography>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
              Login
            </Button>
          </form>
          <Typography align="center">
            Don't have an account?{" "}
            <MuiLink component={Link} to="/register">
              Register Now
            </MuiLink>
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
