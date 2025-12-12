import { getArea } from "@/api/api";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";

type Props = {
  id: number | null;
  open: boolean;
  onOpenChange: (state: boolean) => void;
};

interface Area {
  email: string;
  phone: string;
  instagram: string;
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

function AreaSheet({ id, open, onOpenChange }: Props) {
  const [loadingArea, setLoadingArea] = useState(true);

  const [area, setArea] = useState<Area>({
    email: "",
    phone: "",
    instagram: "",
    titulo: "",
    descricao: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
  });

  const consulta = useCallback(async () => {
    if (!id) return;

    try {
      setLoadingArea(true);
      const response = await getArea(id);
      const info = response.data.message;
      const endereco = info.endereco || {};
      const contato = info.usuario || {};

      setArea((prev) => ({
        ...prev,
        ...info,
        ...endereco,
        ...contato,
        numero: endereco.numero || "",
        complemento: endereco.complemento || "",
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingArea(false);
    }
  }, [id]);

  useEffect(() => {
    if (open && id) {
      consulta();
    }
  }, [open, id, consulta]);

  const resetSheet = () => {
    setArea({
      email: "",
      phone: "",
      instagram: "",
      titulo: "",
      descricao: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
      complemento: "",
    });
    onOpenChange(false);
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="bg-[#E3F1F4] border-none sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl overflow-y-auto">
          {loadingArea ? (
            <Loading />
          ) : (
            <>
              <SheetHeader className="pt-10">
                <SheetTitle className="text-lg font-semibold text-gray-800">
                  Área ID: {id}
                </SheetTitle>
                <SheetDescription className="">
                  Informações da área selecionada.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-3 px-4">
                <div className="bg-[#71B5CA] rounded-xl p-5 shadow-md border border-[#E3F1F4]">
                  <div className="flex justify-center py-2 font-medium">
                    <p className="text-lg font-semibold text-gray-800">
                      Área Esportiva: {area.titulo}
                    </p>
                  </div>
                  <div className="bg-[#AAD3DF] p-3 rounded-xl flex flex-col shadow-md border border-[#71B5CA]">
                    <div className="flex justify-center items-center ">
                      <p className="text-lg font-semibold text-gray-800">
                        Informações:{" "}
                      </p>
                    </div>
                    <p className="text-base text-gray-700">
                      Nome: {area.titulo}
                    </p>
                    <p className="text-base text-gray-700 break-all">
                      Descrição: {area.descricao}
                    </p>
                  </div>
                  <div className="bg-[#AAD3DF] p-3 rounded-xl flex flex-col my-4 shadow-md border border-[#71B5CA]">
                    <div className="flex justify-center items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        Contato:{" "}
                      </p>
                    </div>
                    <p className="text-base text-gray-700">
                      Email: {area.email}
                    </p>
                    <p className="text-base text-gray-700">
                    Telefone: {area.phone}
                    </p>
                    <p className="text-base text-gray-700">
                      Instagram: {area.instagram}
                    </p>
                  </div>
                  <div className="bg-[#AAD3DF] p-3 rounded-2xl flex flex-col my-4 shadow-md border border-[#71B5CA]">
                    <div className="flex justify-center items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        Localidade:{" "}
                      </p>
                    </div>
                    <p className="text-base text-gray-700">Rua: {area.rua}</p>
                    <p className="text-base text-gray-700">
                      Bairro: {area.bairro}
                    </p>
                    <p className="text-base text-gray-700">
                      Número: {area.numero}
                    </p>
                    <p className="text-base text-gray-700">
                      Cidade: {area.cidade}
                    </p>
                    <p className="text-base text-gray-700">
                      Estado: {area.estado}
                    </p>
                    <p className="text-base text-gray-700">CEP: {area.cep}</p>
                    <p className="text-base text-gray-700">
                      Complemento: {area.complemento}
                    </p>
                  </div>
                </div>
              </div>
              <SheetFooter className="pb-10">
                <Button onClick={() => resetSheet()}>Votlar</Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AreaSheet;