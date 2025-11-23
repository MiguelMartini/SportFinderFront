import { editUser, getUser } from "@/api/api";
import InputForm from "@/components/custom/inputForm";
import Menu from "@/components/custom/Menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  documento: string;
}

const Editar = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    documento: "",
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [admIn, setAdmIn] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    password: string;
    confirmedPass: string;
    documento: string;
  }>({});

  useEffect(() => {
    const fectchUser = async () => {
      try {
        const response = await getUser();
        console.log(response.data);
        setUser(response.data.message);
        setName(response.data.message.name);
        setEmail(response.data.message.email);
        setDocumento(response.data.message.documento);
      
      } catch (error: any) {
        console.log(error.data);
        toast.error("Erro ao buscar usuário");
      }
      
    };
     
    fectchUser();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setErrors({});
    try {
      if (admIn) {
        console.log("Caiu aqui");
        const response = await editUser({
          name,
          email,
          role: "admin",
          documento,
          password,
          password_confirmation: confirmedPass,
        });

        console.log(response);
        toast.success("Usuário atualizado com sucesso");
        navigate("/home");
      } else {
        console.log("Caiu aqui sem admin");
        const response = await editUser({
          name,
          email,
          role: "usuario",
          documento: "",
          password,
          password_confirmation: confirmedPass,
        });
        console.log(response);
        toast.success("Usuário atualizado com sucesso");
        navigate("/home");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        const msgs = error.response.data.message;
        const backendErrors: any = {};

        Object.keys(msgs).forEach((field) => {
          backendErrors[field] = msgs[field][0];
        });
        setTimeout(function () {
          setErrors({});
        }, 5000);

        toast.error("Verifique os campos");
        setErrors(backendErrors);
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
      <div className="flex justify-center flex-col items-center h-screen">
        <Menu />
        <div
          className="flex flex-col justify-center bg-[#AAD3DF]/60 p-12 rounded-xl inset-shadow-sm
    shadow-xl/20 "
        >
          <p className="flex justify-start font-bold text-2xl">
            Configurações de perfil
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
              placeholder={"Digite seu endereço de e-mail"}
              value={name}
              onChange={setName}
              error={errors.name}
            />
          </div>
          <div className="mt-4">
            <InputForm
              labelValue={"Senha"}
              placeholder={"Digite sua senha"}
              type="password"
              onChange={setPassword}
              value={password}
              error={errors.password}
            />
          </div>
          <div className="mt-4">
            <InputForm
              labelValue={"Confirmar senha"}
              placeholder={"confirme sua senha"}
              type="password"
              value={confirmedPass}
              onChange={setConfirmedPass}
              error={errors.confirmedPass}
            />
          </div>
          <div className="p-0.5 bg-gray-500 mt-5 rounded-4xl"></div>
          <div className="flex items-center space-x-2 my-5">
            <Switch
              checked={admIn}
              onCheckedChange={setAdmIn}
              id="airplane-mode"
            />
            <Label htmlFor="airplane-mode">
              Cadastrar-se como Administrador
            </Label>
          </div>
          {(admIn || documento) && (
            <div className="flex flex-row items-start gap-4">
              <div className="w-1/2">
                <InputForm
                  labelValue={"Documento"}
                  placeholder={"Documento CNPJ"}
                  value={documento ?? ""}
                  onChange={setDocumento}
                  error={errors.documento}
                />
              </div>
              <div className="w-1/2">
                <InputForm
                  labelValue={"Papel"}
                  placeholder={"Admin"}
                  value={"Admin"}
                  disabled={true}
                />
              </div>
            </div>
          )}

          <div className="flex flex-row justify-center mt-10 gap-3">
            <Button
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl"
              onClick={backMenu}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl "
            >
              {loading ? <Spinner /> : "Salvar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar;
