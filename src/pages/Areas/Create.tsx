import { createArea } from "@/api/api";
import InputForm from "@/components/custom/inputForm";
import Menu from "@/components/custom/Menu";
import TextForm from "@/components/custom/TextForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormState {
  titulo: string;
  descricao: string;
  rua: string;
  numero: number | "";
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string;
}

const Create = () => {
  const [form, setForm] = useState<FormState>({
    titulo: "",
    descricao: "",
    rua: "",
    numero: 0,
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    titulo: string;
    descricao?: string;
    rua: string;
    numero?: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento?: string;
  }>({});

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({
    ...prev,
    [field]: value
   }));
  };

  const consultaCep = async (cep:string)  =>{
    try{
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if(data.erro){
        toast.error("CEP não encontrado")
        return;
      }

      setForm(prev => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
        complemento: data.complemento || "",
      }));

      toast.success("Endereço atualizado!")
    }catch(error){
      toast.error("Erro ao buscar CEP")
    }
  }

  const handleCreate = async () => {
    setLoading(true);
    setErrors({});
    try {
      const response = await createArea(form);
      toast.success(`${response.data.message}`);
      navigate("/home");

    } catch (error: any) {
      console.log(error)
      if (error.response && error.response.data.message) {
        const msgs = error.response.data.message;
        const backendErrors: any = {};

        Object.keys(msgs).forEach((field) => {
          backendErrors[field] = msgs[field][0];
        });
        setTimeout(function () {
          setErrors({});
        }, 5000);

        // setErrors(backendErrors);
        console.log(backendErrors)
        toast.error(backendErrors);
      } else {
        toast.error("Erro de conexão com o servidor.");
      }
    }
    setLoading(false);
  };

  const backMenu = () => {
    navigate("/home");
  };
  return (
    <div>
      <div className="flex justify-center flex-col items-center min-h-screen">
        <Menu />
        <div
          className="flex flex-col justify-center bg-[#AAD3DF]/60 p-12 rounded-xl inset-shadow-sm shadow-xl/20"
        >
          <p className="text-3xl font-bold text-gray-800">
            Criar área esportiva
          </p>
          <div className="p-0.5 bg-gray-500 mt-3 rounded-4xl"></div>
          <div className="lg:flex flex-row justify-center sm:flex flex-col">
            <div>
              <p className="text-xl font-semibold text-gray-700 mt-5">Informações</p>
              {/* <div className="mt-5 ">
                <div className="bg-gray-50 rounded-xl">
                <Input type="file"/>
                </div>
              </div> */}
              <div className="mt-5 ">
                <InputForm
                  labelValue={"Titulo"}
                  placeholder={"Digite seu endereço de e-mail"}
                  value={form.titulo}
                  onChange={(v) => handleChange("titulo", v)}
                  error={errors.titulo}
                />
              </div>
              <div className="mt-4">
                <TextForm
                  labelValue={"Descrição"}
                  placeholder={"Descreva sua área esportiva"}
                  value={form.descricao}
                  onChange={(v) => handleChange("descricao", v)}
                  error={errors.descricao}
                />
              </div>
            </div>
            <div className="mx-6"></div>
            {/* coluna dos endereços */}
            
            <div className= "lg:w-1/2 sm: w-full">
              <p className="text-xl font-semibold text-gray-700 mt-5">Endereço</p>
              <div className="mt-4">
                <InputForm
                  labelValue={"CEP"}
                  placeholder={"Digite o CEP"}
                  value={form.cep}
                  onChange={(v) => handleChange("cep", v)}
                  onBlur={(cep) => consultaCep(cep)}
                  error={errors.cep}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <InputForm
                  labelValue={"Rua"}
                  placeholder={"Digite sua rua"}
                  value={form.rua}
                  onChange={(v) => handleChange("rua", v)}
                  error={errors.rua}
                  />
              </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Bairro"}
                  placeholder={"Digite seu bairro"}
                  value={form.bairro}
                  onChange={(v) => handleChange("bairro", v)}
                  error={errors.bairro}
                  />
              </div>
                  </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Cidade"}
                  placeholder={"Digite a cidade"}
                  value={form.cidade}
                  onChange={(v) => handleChange("cidade", v)}
                  error={errors.cidade}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mt-4">
                <InputForm
                  labelValue={"Estado"}
                  placeholder={"Digite o estado"}
                  value={form.estado}
                  onChange={(v) => handleChange("estado", v)}
                  error={errors.estado}
                  />
              </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Número"}
                  placeholder={"Digite o nº da área"}
                  value={form.numero}
                  type="number"
                  onChange={(v) => handleChange("numero", v === "" ? "" : Number(v))}
                  />
              </div>
                  </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Complemento"}
                  placeholder={"Digite o complemento"}
                  value={form.complemento}
                  onChange={(v) => handleChange("complemento", v)}
                  error={errors.complemento}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center mt-10 gap-3">
            <Button
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl"
              onClick={backMenu}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl "
            >
              {loading ? <Spinner /> : "Cadastrar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;