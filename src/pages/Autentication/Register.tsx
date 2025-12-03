import { registerUser } from "@/api/api";
import Copyrights from "@/components/custom/Copyrights";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import InputForm from "@/components/custom/inputForm";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [loading, setLoading] = useState(false);

  

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    city?: string;
    password?: string;
    confirmedPass?: string;
  }>({});

  const setStates = () => {
      setEmail("");
      setName("");
      setCity("");
      setPassword("");
      setConfirmedPass("");
  }

  const handleRegister = async () => {
    setErrors({});
    setLoading(true);

    try {
      const response = await registerUser({
        email,
        name,
        city,
        password,
        password_confirmation: confirmedPass,
      });
      toast.success("Cadastro realizado com sucesso");
      navigate('/login')
      setStates();

    } catch (error: any) {
      if (error.response && error.response.data.message) {
        const msgs = error.response.data.message;
        const backendErrors: any = {};

        Object.keys(msgs).forEach((field) => {
          backendErrors[field] = msgs[field][0];
        });
        setTimeout(function () {
          setErrors({});
          setStates();
        }, 3000);

        toast.error("error");
        setErrors(backendErrors);
      } else {
        toast.error("Erro de conexão com o servidor.");
        setStates();
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full h-screen flex-col justify-between">
      <div className="w-full flex items-center justify-center flex-1">
        <div className="p-6 md:p-10 lg:p-20 bg-[#AAD3DF] rounded-xl inset-shadow-sm shadow-md order border-[#E3F1F4]">
          <h1 className="text-3xl md:text-4xl flex justify-center lg:text-5xl font-semibold text-gray-800">
            Seja bem-vindo 
          </h1>
          <p className="font-medium text-base md:text-lg text-gray-700 mt-4 ">
            Registre-se agora no SportFinder!
          </p>

          <div className="p-0.5 bg-gray-500 mt-5 rounded-4xl"></div>

          <div className="mt-5">
            <InputForm 
              labelValue={"E-mail"} 
              placeholder={"Digite seu endereço de e-mail"}
              value={email}
              onChange={setEmail}
              error={errors.email}
              />
          </div>
          <div className="mt-4">
            <InputForm 
              labelValue={"Nome"} 
              placeholder={"Digite seu nome"}
              value={name}
              onChange={setName}
              error={errors.name}
              />
          </div>
          <div className="mt-4">
            <InputForm 
              labelValue={"Cidade"} 
              placeholder={"Digite sua cidade"}
              value={city}
              onChange={setCity}
              error={errors.city}
              />
          </div>

          <div className="mt-4">
            <InputForm 
              labelValue={"Senha"} 
              placeholder={"Digite sua senha"}
              value={password}
              onChange={setPassword}
              error={errors.password}
              type="password"
              />
          </div>
          <div className="mt-4">
            <InputForm 
              labelValue={"Confirmar senha"} 
              placeholder={"confirme sua senha"}
              value={confirmedPass}
              onChange={setConfirmedPass}
              type="password"
              />
          </div>
          <div className="flex flex-col mt-10 gap-3">
            <Button
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-[#3f6874] hover:bg-[#578d9e]"
              onClick={handleRegister}
            >
              {loading ? <Spinner /> : "Registrar"}
            </Button>

            <p className="text-gray-500 font-medium text-sm md:text-base">
              Já possui uma conta?{" "}
              <Link to="/login" className="text-[#28444d] font-semibold underline">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Copyrights />
    </div>
  );
};

export default Register;