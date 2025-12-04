import { loginUser } from "@/api/api";
import Copyrights from "@/components/custom/Copyrights";
import InputForm from "@/components/custom/inputForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../assets/icon-c.png";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useAuth();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    teste?: string;
  }>({});

  const setStates = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      const token = response.data.data.token;
      setToken(token);
      const userId = response.data.data.id;
      localStorage.setItem("user_id", userId);

      toast.success("Logado com sucesso!");
      navigate("/home");

    } catch (error: any) {
  if (error.response && error.response.data.message) {
    const msgs = error.response.data.message;

    if (typeof msgs === "object") {
      const backendErrors: any = {};
      Object.keys(msgs).forEach((field) => {
        backendErrors[field] = msgs[field][0];
      });
      setErrors(backendErrors);
    } else {
      setErrors({ teste: msgs }); 
      toast.error(msgs);
    }

    setTimeout(() => {
      setErrors({});
      setStates();
    }, 5000);

  } else {
    toast.error("Erro de conexão com o servidor.");
    setStates();
  }

  setLoading(false);
}
    setLoading(false);
  };

  return (
    <div className="flex w-full h-screen flex-col justify-between">
      <div className="w-full flex items-center justify-center flex-1">
        <div className="p-6 md:p-10 lg:p-20 bg-[#AAD3DF] rounded-xl inset-shadow-sm shadow-md order border-[#E3F1F4]">
          <div className="flex justify-center flex-col items-center">
            <img
              src={Icon}
              alt="Icone mundo"
              className="mb-4 w-[65px] h-[65px] sm:w-[90px] sm:h-[90px] md:w-[96px] md:h-[96px]"
            />
            <h1 className="text-3xl md:text-4xl flex justify-center lg:text-5xl font-semibold text-gray-800">
              Seja bem-vindo
            </h1>
          </div>

          <p className="font-medium text-base md:text-lg text-gray-700 mt-4 ">
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
            <button onClick={() => toast.warning("Página em construção")}>
              <a
                href="#"
                className="text-[#28444d] underline font-semibold text-sm md:text-base"
              >
                Esqueceu a senha?
              </a>
            </button>
          </div>
          <div className="flex flex-col mt-5 gap-3">
            <Button
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-[#3f6874] hover:bg-[#578d9e]"
              onClick={handleLogin}
            >
              {loading ? <Spinner /> : "Entrar"}
            </Button>

            <p className="text-gray-500 font-medium text-sm md:text-base">
              Não possui conta?{" "}
              <Link
                to="/register"
                className="text-[#28444d] font-semibold underline"
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
