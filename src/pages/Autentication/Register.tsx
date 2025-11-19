import { registerUser } from "@/api/api";
import Copyrights from "@/components/custom/Copyrights";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import InputForm from "@/components/custom/inputForm";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    password?: string;
    confirmedPass?: string;
  }>({});

  const setStates = () => {
      setEmail("");
      setName("");
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
        password,
        password_confirmation: confirmedPass,
      });
      toast.success("Cadastro realizado com sucesso");
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
        <div className="p-6 md:p-10 lg:p-20 bg-white rounded-xl">
          <h1 className="text-3xl md:text-4xl flex justify-center lg:text-5xl font-semibold">
            Seja bem-vindo
          </h1>
          <p className="font-medium text-base md:text-lg text-gray-500 mt-4 ">
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
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700"
              onClick={handleRegister}
            >
              {loading ? <Spinner /> : "Registrar"}
            </Button>

            <p className="text-gray-500 font-medium text-sm md:text-base">
              Já possui uma conta?{" "}
              <Link to="/login" className="text-blue-700 font-medium underline">
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