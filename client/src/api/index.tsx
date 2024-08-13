import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:5000/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (formData: any) =>
  API.post("/auth/register", formData);
export const loginUser = (formData: any) => API.post("/auth/login", formData);
