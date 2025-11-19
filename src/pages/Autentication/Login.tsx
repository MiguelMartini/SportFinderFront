import { loginUser } from "@/api/api";
import Copyrights from "@/components/custom/Copyrights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);

    try{
      const response = await loginUser({
        email,
        password,
      });
      console.log(response.data.data.token)
      toast.success(response.data.message);
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
            <label className="text-base md:text-lg font-medium">E-mail</label>
            <Input
              className="bg-gray-50 text-sm w-full p-3 md:p-4 lg:p-5 rounded-xl"
              placeholder="Digite seu endereço de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium">{errors.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-base md:text-lg font-medium">Senha</label>
            <Input
              className="bg-gray-50 text-sm w-full p-3 md:p-4 lg:p-5 rounded-xl"
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-medium">{errors.password}</p>
            )}
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
