import { getUsers } from "@/api/api";
import Logout from "@/components/custom/Logout";
import React, { useEffect, useState } from "react";

interface User{
    id: number;
    name: string;
    email: string;
}

const Dash = () => {
const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()

        console.log("API RESPONSE:", response.data.data);

        // Ajuste baseado no retorno real
        setUsers(response.data.data);
        console.log(users)
      } catch (error: any) {
        console.log(error);

        if (error.response && error.response.data.message) {
          const msgs = error.response.data.message;
          const backendErrors: any = {};

          Object.keys(msgs).forEach((field) => {
            backendErrors[field] = msgs[field][0];
          });

          setErrors(backendErrors);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
     <div>
      <h1>Usuários</h1>

      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.id}</strong>:<strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      )}
      <Logout/>
    </div>
  )
};

export default Dash;
