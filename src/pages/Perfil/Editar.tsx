import { deleteUser, editUser, getUser } from "@/api/api";
import DeleteBtn from "@/components/custom/DeleteBtn";
import InputForm from "@/components/custom/inputForm";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  documento: string;
  phone:string;
}

const Editar = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    documento: "",
    phone: "",
  });

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");

  const [loading, setLoading] = useState(false);
  const [admIn, setAdmIn] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    name?: string;
    password?: string;
    confirmedPass?: string;
    documento?: string;
    phone?:string;
  }>({});
  useEffect(() => {
    const fectchUser = async () => {
      try {
        const response = await getUser();
        const data = response.data.message;
        setUser(data);
        setAdmIn(data.role === "admin");
        console.log(data.role);
        toast.success("Dados carregados com sucesso!");
      } catch (error: any) {
        console.log(error.data);
        toast.error("Erro ao buscar usuário");
      }
    };

    fectchUser();
  }, []);

  const handleDelete = async () => {
    const response = await deleteUser(user.id);
    toast.success(response.data.message);
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setErrors({});
    try {
      if (admIn) {
        await editUser({
        name: user.name,
        email: user.email,
        role: "admin",
        documento: user.documento,
        phone: user.phone,
        password,
        password_confirmation: confirmedPass,
      });

        toast.success("Usuário atualizado com sucesso");
        navigate("/home");
      } else {
        await editUser({
          name: user.name,
          email: user.email,
          role: "usuario",
          documento: "",
          password,
          password_confirmation: confirmedPass,
        });
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

        setErrors(backendErrors);
        toast.error("Verifique os campos");
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
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-10 mb-10">
        <div className="flex flex-col justify-center bg-[#AAD3DF]/60 p-10 rounded-xl inset-shadow-sm shadow-xl/20 ">
          <p className="flex justify-start font-bold text-2xl">
            Configurações de perfil
          </p>
          <div className="p-0.5 bg-gray-500 mt-5 rounded-4xl"></div>
          <div className="mt-5">
            <InputForm
              labelValue={"E-mail"}
              placeholder={"Digite seu endereço de e-mail"}
              value={user.email}
              onChange={(v) => handleChange("email", v)}
              error={errors.email}
            />
          </div>
          <div className="mt-4">
            <InputForm
              labelValue={"Nome"}
              placeholder={"Digite seu endereço de e-mail"}
              value={user.name}
              onChange={(v) => handleChange("name", v)}
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
          {admIn && (
            <div className="flex flex-row items-start gap-4">
              <div className="grid grid-cols-2 gap-4 w-full">

              <div className="w-full">
                <InputForm
                  labelValue={"Documento"}
                  placeholder={"Documento CNPJ"}
                  value={user.documento ?? ""}
                  onChange={(v) => handleChange("documento", v)}
                  error={errors.documento}
                  />
              </div>
              <div className="w-full">
                <InputForm
                  labelValue={"Papel"}
                  placeholder={"Admin"}
                  value={"Admin"}
                  disabled={true}
                  onChange={() => null}
                  />
              </div>
              <div className="w-full">
                <InputForm
                  labelValue={"Telefone"}
                  placeholder={"Telefone para contato"}
                  value={user.phone ?? ""}
                  onChange={(v) => handleChange("phone", v)}
                  error={errors.phone}
                  />
              </div>
                  </div>
            </div>
          )}

          <div className="flex flex-col justify-center mt-10 gap-3 sm:flex-row">
            <Button
              onClick={handleSave}
              className="order-1 active:scale-[.98] py-4 md:py-6 md:order-3 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl "
            >
              {loading ? <Spinner /> : "Salvar"}
            </Button>
            <Button
              className="order-2 active:scale-[.98] py-4 md:py-6 md:order-1 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl"
              onClick={backMenu}
            >
              Cancelar
            </Button>
            <DeleteBtn
              value={"Deletar"}
              style="order-3 active:scale-[.98] py-4 md:py-6 md:order-2 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-red-500 hover:bg-red-700 shadow-xl"
              onConfirm={() => handleDelete()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editar;