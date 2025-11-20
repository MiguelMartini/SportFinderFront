import { loginUser } from "@/api/api";
import Copyrights from "@/components/custom/Copyrights";
import InputForm from "@/components/custom/inputForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teste, setTeste] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    teste?: string;
  }>({});

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);

    try{
      const response = await loginUser({
        email,
        password,
      });

      const token = response.data.data.token;
      setToken(token);
      toast.success("Logado com sucesso!");

      setTimeout(function () {
          navigate('/dash');
        }, 2000);
      
    }catch (error: any){
      if(error.response && error.response.data.message){
        const msgs = error.response.data.message;
        const backendErrors: any = {};

        Object.keys(msgs).forEach((field) => {
          backendErrors[field] = msgs[field][0];
        });
        setTimeout(function () {
          setErrors({});
        }, 5000);

        console.log(teste)
        toast.error("error");
        setErrors(backendErrors);
      } else {
        toast.error("Erro de conexão com o servidor.");
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
            Seja bem vindo ao SportFinder!
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
              labelValue={"Senha"} 
              placeholder={"Digite sua senha"}
              value={password}
              onChange={setPassword}
              error={errors.password}
              type="password"
              />
          </div>

          <div className="items-center mt-5">
            <p>
              <a
                href="#"
                className="text-blue-700 underline font-medium text-sm md:text-base"
              >
                Esqueceu a senha?
              </a>
            </p>
          </div>
          <div className="flex flex-col mt-5 gap-3">
            <Button className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700"
            onClick={handleLogin}>
              {loading ? <Spinner /> : "Entrar"}
            </Button>

            <p className="text-gray-500 font-medium text-sm md:text-base">
              Não possui conta?{" "}
              <Link
                to="/register"
                className="text-blue-700 font-medium underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Copyrights />
    </div>
  );
};

export default Login;
