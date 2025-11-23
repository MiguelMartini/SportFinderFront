import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { CircleUser } from "lucide-react";
import { Earth } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/api/api";
import { toast } from "sonner";

const Menu = () => {
  const navigate = useNavigate();

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
  const editarProfile = () => {
    navigate("/perfil/editar")
  }

  return (
    <div>
      <div
        className="
      fixed top-0 left-1/2 -translate-x-1/2 z-50 
      w-full max-w-5xl 
      px-4 sm:px-6 
      mt-6 sm:mt-10
    "
      >
        <Menubar
          className="
    flex justify-between items-center 
    w-full 
    py-6 sm:py-6 
    rounded-xl 
    px-2 sm:px-10 
    text-gray-800 
    border-none 
    inset-shadow-sm
    shadow-xl/40 
    bg-[#AAD3DF]/60
    backdrop-blur-lg
  "
        >
          <a
            href="https://github.com/MiguelMartini/SportFinderFront.git"
            target="_blank"
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
          >
            <Earth className="w-5 h-5 sm:w-6 sm:h-6" />

            <p className="font-bold text-base sm:text-lg">SportFinder</p>
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm sm:text-lg">
                Áreas Esportivas
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Consultar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Editar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="flex items-center cursor-pointer gap-2 sm:gap-3">
                <p className="font-medium text-sm sm:text-lg">Perfil</p>

                <div className="p-1 rounded-full">
                  <CircleUser className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem inset onClick={editarProfile} className="cursor-pointer">Editar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset onClick={handleLogout}>
                  Sair
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>
        </Menubar>
      </div>
    </div>
  );
};

export default Menu;
