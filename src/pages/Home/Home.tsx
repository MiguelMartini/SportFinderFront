import { getUsers } from "@/api/api";
import MapComponent from "@/components/custom/Map";
import Menu from "@/components/custom/Menu";
import { useEffect, useState } from "react";

interface User{
    id: number;
    name: string;
    email: string;
}

const Dash = () => {
const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState<any>({});

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await getUsers()

  //       console.log("API RESPONSE:", response.data.data);

  //       // Ajuste baseado no retorno real
  //       setUsers(response.data.data);
  //       console.log(users)
  //     } catch (error: any) {
  //       console.log(error);

  //       if (error.response && error.response.data.message) {
  //         const msgs = error.response.data.message;
  //         const backendErrors: any = {};

  //         Object.keys(msgs).forEach((field) => {
  //           backendErrors[field] = msgs[field][0];
  //         });

  //         setErrors(backendErrors);
  //       }
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
     <div>
      <Menu/>
      <MapComponent/>
    </div>
  )
};

export default Dash;
