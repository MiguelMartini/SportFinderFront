
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");

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

export const getUser = () => {
  const userId = localStorage.getItem("user_id")
  return api.get(`/users/${userId}`);
};

export const editUser = (data: {
  email?: string;
  name?: string;
  documento?: string;
  role?: string;
  password: string;
  password_confirmation: string;
}) => {
  const userId = localStorage.getItem("user_id")
  return api.patch(`/users/edit/${userId}`, data);
};

export const createArea = (data: {
  titulo: string;
  descricao?: string;

  rua: string;
  numero?: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
  lat: number;
  lon: number;
}) => {
  const userId = localStorage.getItem("user_id")
  return api.post(`areas`, {...data, id_administrador:userId});
};

export const editArea = (data: {
  titulo: string;
  descricao?: string;

  rua: string;
  numero?: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
}, id:number) => {
  return api.patch(`areas/edit/${id}`, data);
};

export const getArea = (id:number) => {
  return api.get(`/areas/${id}`);
};

export const getAdminAreas = () => {
  return api.get(`areasadmin`);
};
export const getAreas = () => {
  return api.get(`areas`);
};
export const deleteArea = (id:number) => {
  return api.delete(`/areas/${id}`);
};

export const logOut = () => {
  return api.post("/logout");
};

export default api;
