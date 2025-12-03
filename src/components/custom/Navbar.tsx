import { logOut } from "@/api/api";
import { Earth } from "lucide-react";
import { CircleUser } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {};

const Navbar = (props: Props) => {
  const [openAreas, setOpenAreas] = useState(false);
  const [openPerfil, setOpenPerfil] = useState(false);
  const navigate = useNavigate();

  const dropMenu  = (menu: "perfil" | "areas") => { 
    if(menu === "areas"){
      setOpenAreas(!openAreas);
      setOpenPerfil(false)
    }
    if(menu === "perfil"){
      setOpenPerfil(!openPerfil)
      setOpenAreas(false);
    }
  }

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      toast.error("Erro ao fazer logout: ");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      navigate("/login");
    }
  };
  return (
    <div>
      <header className="bg-[#AAD3DF] shadow-xl/15 ">
        <div className="flex justify-between px-3 py-5 sm:px-4 relative lg:px-50">
          <div className="flex flex-row gap-2 p-2">
            <Earth />
            <p className="font-semibold text-lg text-gray-800 sm:text-lg">Sportifinder</p>
          </div>

          <div className="flex flex-row gap-5 relative">
            <div className="relative">
              <button
                onClick={() => dropMenu("areas")}
                className="font-semibold text-gray-800 hover:bg-gray-100 rounded-2xl p-2 cursor-pointer"
              >
                Áreas Esportivas
              </button>

              {openAreas && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-10">
                  <p className="p-2 text-gray-800 hover:bg-[#E3F1F4] rounded-xl cursor-pointer" onClick={() => navigate("/home")}>
                    Consultar
                  </p>
                  <p className="p-2 text-gray-800 hover:bg-[#E3F1F4] rounded-xl cursor-pointer" onClick={() => navigate("/areas/store")}>Criar</p>
                  <p className="p-2 text-gray-800 hover:bg-[#E3F1F4] rounded-xl cursor-pointer" onClick={() => navigate("/areas/edit")}>
                    Editar
                  </p>
                </div>
              )}
            </div>
            {/* <p>Áreas Esportivas</p> */}
            <div className="relative">
              <button
                onClick={() => dropMenu("perfil")}
                className="flex flex-row gap-2 items-center font-semibold text-gray-800 hover:bg-gray-100 rounded-2xl p-2 cursor-pointer"
              >
                <p>Perfil</p>
                <CircleUser />
              </button>

              {openPerfil && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-10">
                  <p className="p-2 text-gray-800 hover:bg-[#E3F1F4] rounded-xl cursor-pointer" onClick={() => navigate("/perfil/editar")}>
                    Editar
                  </p>
                  <p className="p-2 text-gray-800 hover:bg-[#E3F1F4] rounded-xl cursor-pointer" onClick={handleLogout}>Sair</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
