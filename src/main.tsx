import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Autentication/Login.tsx'
import Register from './pages/Autentication/Register.tsx'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext.tsx'
import Home from './pages/Home/Home.tsx'
import Editar from './pages/Perfil/Editar.tsx'
import Create from './pages/Areas/Create.tsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/login", element: <Login/>},
  {path: "/register", element: <Register/>},
  {path: "/home", element: <Home/>},
  {path: "/perfil/editar", element: <Editar/>},
  {path: "/areas/create", element: <Create/>},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster richColors position="top-center" />
    </AuthProvider>
  </StrictMode>,
)
