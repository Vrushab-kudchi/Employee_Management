import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline } from "@mui/material";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import EmployeeList from "./components/EmployeeList";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
