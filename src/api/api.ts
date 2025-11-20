
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = (data: {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}) => {
  return api.post("/register", data);
};

export const loginUser = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/login", data);
}

export const getUsers = () => {
  return api.get("/users");
};

export const logOut = () => {
  return api.post("/logout");
};
export default api;
