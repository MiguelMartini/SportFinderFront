import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Autentication/Login.tsx'
import Register from './pages/Autentication/Register.tsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/login", element: <Login/>},
  {path: "/register", element: <Register/>},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
