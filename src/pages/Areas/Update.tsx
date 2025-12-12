import { editArea, getArea } from "@/api/api";
import Btn from "@/components/custom/Btn";
import InputForm from "@/components/custom/InputForm";
import Navbar from "@/components/custom/Navbar";
import TextForm from "@/components/custom/TextForm";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const emptyForm: FormState = {
  titulo: "",
  descricao: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
  complemento: "",
};

const Update = () => {
  const { id } = useParams();
  const areaId = Number(id);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

const consultaCep = async (cep: string) => {
  if(cep.length < 8) return;

    try {
      const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) return toast.error("CEP não encontrado");

      setForm((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));

      toast.success("Endereço atualizado!");
    } catch (error) {
      toast.error("Erro ao buscar CEP");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getArea(areaId);
        const info = response.data.message;
        const endereco = response.data.message.endereco;

        setForm((prev) => ({
          ...prev,
          titulo: info.titulo,
          descricao: info.descricao,
          rua: endereco.rua || "",
          bairro: endereco.bairro || "",
          cidade: endereco.cidade || "",
          estado: endereco.estado || "",
          cep: endereco.cep || "",
          numero: endereco.numero || "",
          complemento: endereco.complemento || "",
        }));

      } catch (error: any) {
        console.log(error);
      }
    })();
  }, [areaId]);

  const handleUpdate = async () => {
    setLoading(true);
    setErrors({});

    try {
      const payload = {
        ...form,
        numero: form.numero === "" ? null : Number(form.numero),
      };
      const response = await editArea(payload, id);
      toast.success(`${response.data.message}`);
      navigate("/home");

    } catch (error: any) {
      console.log(error);
      if (error.response?.data?.message) {
        const msgs = error.response.data.message;
        const backendErrors: Record<string, string> = {};

        Object.keys(msgs).forEach((field) => {
          backendErrors[field] = msgs[field][0];
        });

        
        setErrors(backendErrors);
        toast.error("Verifique os campos");
        setTimeout(function () {
          setErrors({});
        }, 5000);
      } else {
        toast.error("Erro de conexão com o servidor.");
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center flex-col items-center bg">
        <div className="flex flex-col justify-center mt-10 bg-[#AAD3DF]/60 p-12 rounded-xl inset-shadow-sm shadow-xl/20">
          <p className="text-3xl font-bold text-gray-800">
            Editar área esportiva : Id #{id}
          </p>
          <div className="p-0.5 bg-gray-500 mt-3 rounded-4xl"></div>
          <div className="flex flex-col sm:flex sm:flex-row justify-center">
            <div>
              <p className="text-xl font-semibold text-gray-700 mt-5">
                Informações
              </p>
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

            <div className="lg:w-1/2 sm: w-full">
              <p className="text-xl font-semibold text-gray-700 mt-5">
                Endereço
              </p>
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
                    error={errors.numero}
                    type="number"
                    onChange={(v) => handleChange("numero", v)}
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
          <div className="flex flex-col items-stretch sm:flex-col lg:flex-row justify-center mt-10 gap-3">
            <Btn value="Voltar" onClick={() => navigate("/areas/edit")} />
            <Btn value="Cancelar" onClick={() => navigate("/home")} />
            <Btn
              value={loading ? <Spinner /> : "Salvar"}
              onClick={() => handleUpdate()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;