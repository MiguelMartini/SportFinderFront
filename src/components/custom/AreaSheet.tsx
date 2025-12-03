import { getArea } from "@/api/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useEffect, useState } from "react";

type Props = {
  id: number | null;
  open: boolean;
  onOpenChange: (state: boolean) => void;
};

interface Area {
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
  const [loading, setLoading] = useState(false);

  const [area, setArea] = useState<Area>({
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

  const consulta = async () => {
    if (!id) return;

    const response = await getArea(id);
    const info = response.data.message;
    const endereco = info.endereco;

    setArea({
      titulo: info.titulo,
      descricao: info.descricao,
      rua: endereco?.rua || "",
      bairro: endereco?.bairro || "",
      cidade: endereco?.cidade || "",
      estado: endereco?.estado || "",
      cep: endereco?.cep || "",
      numero: endereco?.numero || "",
      complemento: endereco?.complemento || "",
    });
  };

  useEffect(() => {
    if (open && id) {
      consulta();
    }
  }, [open, id]);

  useEffect(() => {
    console.log("Área atualizada: ", area);
  }, [area]);

  return (
    <div>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Área ID: {id}</SheetTitle>
            <SheetDescription>
              Informações da área selecionada.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-3 px-4">
            <Label>ID Selecionado</Label>
            <div className="bg-[#AAD3DF]/60 rounded-xl p-5">
              <p>{id}</p>
              <div className="bg-amber-300 p-3 rounded-xl flex flex-col">
                <div className="flex justify-center items-center">
                    <p className="font-semibold">Informações: </p>
                    </div>
                <p>Nome: {area.titulo}</p>
                <p>Descrição: {area.descricao}</p>
              </div>
              <div className="bg-amber-300 p-3 rounded-2xl flex flex-col mt-4">
                <div className="flex justify-center items-center">
                  <p className="font-semibold">Localidade: </p>
                </div>
                <p>Rua: {area.rua}</p>
                <p>Bairro: {area.bairro}</p>
                <p>Número: {area.numero}</p>
                <p>Cidade: {area.cidade}</p>
                <p>Estado: {area.estado}</p>
                <p>CEP: {area.cep}</p>
                <p>Complemento: {area.complemento}</p>
              </div>
            </div>
          </div>

          <SheetFooter>
            <Button onClick={consulta}>Carregar Dados</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AreaSheet;
