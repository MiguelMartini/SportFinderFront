import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteArea, getAdminAreas } from "@/api/api";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import DeleteBtn from "./DeleteBtn";

interface Area {
  id?: number;
  titulo: string;
  descricao: string;
}

const Tabela = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id:number, area:string) => {
    setLoading(true);
    try{
      await deleteArea(id);
      setAreas((prev) => prev.filter((a) => a.id !== id));
      toast.success(`Área esporitva: ${area} apagada com sucesso:  `)
    }catch(error: any){
      console.log(error)
       toast.error("Erro ao apagar");
    }
    setLoading(false);
  }

  useEffect(() => {
      async function carregar() {
        try{
            setLoading(true)
            const response = await getAdminAreas();
            setAreas(response.data.message);
        }catch(error: any){
            toast.error(error)
        }finally{
            setLoading(false)
        }
    }
    carregar();
  }, []);

  return (
    <div className="max-h-[500px] max-w-[800px] overflow-y-auto">
      <div className="mx-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-base font-semibold">
                Id
              </TableHead>
              <TableHead className="text-base font-semibold">Título</TableHead>
              <TableHead className="text-base font-semibold">
                Descrição
              </TableHead>
              <TableHead className="text-right text-base font-semibold">
                Ação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
  {loading ? (
    <TableRow className="justify-center text-center">
      <TableCell colSpan={4} className="text-center py-6">
        <Spinner />
      </TableCell>
    </TableRow>
  ) : (
    areas.map((area, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">{area.id}</TableCell>
        <TableCell>{area.titulo}</TableCell>
        <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden text-ellipsis">
          {area.descricao}
        </TableCell>
        <TableCell className="text-right flex justify-center">
          <div className="flex justify-center gap-4">
            <Button
              className="active:scale-[.98] md:py-4 lg:py-2 rounded-xl text-white text-base font-bold cursor-pointer bg-amber-600 hover:bg-blue-700 shadow-xl"
              onClick={() => navigate(`/areas/update/${area.id}`)}
            >
              Editar
            </Button>
            <DeleteBtn value={"Excluir"} onConfirm={() => handleDelete(area.id!, area.titulo)}/>
          </div>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>
          <TableCaption>Áreas esportivas: {areas.length}</TableCaption>
        </Table>
      </div>
    </div>
  );
};

export default Tabela;
