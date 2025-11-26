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
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import Update from './pages/Areas/Update.tsx'
import Edit from './pages/Areas/Edit.tsx'
import Store from './pages/Areas/Store.tsx'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/login", element: <Login/>},
  {path: "/register", element: <Register/>},
  {path: "/home", element: <ProtectedRoute role='usuario'><Home/></ProtectedRoute>},
  {path: "/perfil/editar", element: <ProtectedRoute role='usuario'><Editar/></ProtectedRoute>},
  {path: "/areas/update/:id", element: <ProtectedRoute role='admin'><Update/></ProtectedRoute>},
  {path: "/areas/edit", element: <ProtectedRoute role='admin'><Edit/></ProtectedRoute>},
  {path: "/areas/create", element: <ProtectedRoute role='admin'><Create/></ProtectedRoute>},
  {path: "/areas/store", element: <ProtectedRoute role='admin'><Store/></ProtectedRoute>},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster richColors position="top-center" />
    </AuthProvider>
  </StrictMode>,
)
