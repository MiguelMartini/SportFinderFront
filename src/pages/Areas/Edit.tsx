import Navbar from "@/components/custom/Navbar";
import Tabela from "@/components/custom/Tabela";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col items-center mt-10">
        <div className="w-full sm:w-full md:w-200 lg:w-[800px] flex flex-col justify-center bg-[#AAD3DF] m-10 p-4 rounded-xl inset-shadow-sm shadow-md mt-25 order border-[#E3F1F4]">
          <p className="p-4 flex justify-start font-bold text-2xl text-gray-700">
            Editar áreas esportivas
          </p>
          <div className="p-0.5 bg-gray-500 mt-4 rounded-4xl mb-4"></div>
          <Tabela />
        </div>
        <div className="mt-4 mb-4">
          <Button
            onClick={() => navigate("/home")}
            className="active:scale-[.98] py-8 px-20 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-[#3f6874] hover:bg-[#578d9e]"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Edit;