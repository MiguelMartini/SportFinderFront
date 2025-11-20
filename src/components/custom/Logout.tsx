import React from 'react'
import { Button } from '../ui/button'
import { logOut } from '@/api/api'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';


const Logout = () => {
    const navigate = useNavigate();
    const { token } = useAuth();

    console.log("Meu token:", token);


    const handleLogout = async () => {
        const response = await logOut();
        
        console.log(response.data.message)
          navigate('/login');
    }
  return (
    <div>
        <Button onClick={handleLogout}>asd</Button>
    </div>
  )
}

export default Logout