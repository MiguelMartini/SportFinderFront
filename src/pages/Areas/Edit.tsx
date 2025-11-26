import Menu from "@/components/custom/Menu";
import Tabela from "@/components/custom/Tabela";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const Edit = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center flex-col items-center min-h-screen px-4">
        <Menu />
        <div className="w-full sm:w-full md:w-200 lg:w-[800px] flex flex-col justify-center bg-[#AAD3DF]/60 m-10 p-4 rounded-xl inset-shadow-sm shadow-xl/20 mt-25">
        <p className="p-4 flex justify-start font-bold text-2xl">Editar áreas esportivas</p>
        <div className="p-0.5 bg-gray-500 mt-4 rounded-4xl mb-4"></div>
          <Tabela />
        </div>
        <div className="mt-4 mb-4">
          <Button onClick={() => navigate('/home')} className="active:scale-[.98] py-8 px-20 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700">Voltar</Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
