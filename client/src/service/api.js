import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Function to log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    const { token } = response.data;
    if (token) {
      localStorage.setItem("token", token); // Save token in localStorage
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return response.data;
  } catch (error) {
    // Handle login errors
    throw error.response?.data || { message: "Login failed" };
  }
};

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    // Handle registration errors
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Initialize the token from localStorage
const initializeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

initializeToken();

export const getAllEmployees = async () => {
  const response = await api.get("/employees");
  return response.data;
};

export const createEmployee = async (formData) => {
  try {
    console.log("FormData before sending:", formData); // Debugging log
    const response = await api.post("/employees", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create employee:", error.response || error); // Improved error logging
    throw error.response?.data || { message: "Failed to create employee" };
  }
};

export const updateEmployee = async (id, employee) => {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};
