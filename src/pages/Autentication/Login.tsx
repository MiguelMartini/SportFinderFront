import Copyrights from "@/components/custom/Copyrights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";


const Login = () => {
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
              className="bg-gray-50 text-sm w-full mb-5 p-3 md:p-4 lg:p-5 rounded-xl"
              placeholder="Digite seu endereço de e-mail"
            />
          </div>

          <div>
            <label className="text-base md:text-lg font-medium">Senha</label>
            <Input
              className="bg-gray-50 text-sm w-full mb-5 p-3 md:p-4 lg:p-5 rounded-xl"
              placeholder="Digite sua senha"
              type="password"
            />
          </div>

          <div className="items-center">
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
            <Button className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700">
              Entrar
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
      <Copyrights/>
    </div>
  );
};

export default Login;
