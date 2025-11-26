import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputForm from "./inputForm";

interface ModalAreaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: any;
  handleChange: (field: string, val: any) => void;
  handleCreate: () => void;
  consultaCep: (cep: string) => void;
}

export function ModalArea({
  open,
  onOpenChange,
  form,
  handleChange,
  handleCreate,
  consultaCep,
}: ModalAreaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Área</DialogTitle>
          <DialogDescription>
            Informe os dados da área e clique em salvar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label>Título</Label>
            <Input
              value={form.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label>Descrição</Label>
            <Input
              value={form.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
            />
          </div>

           <div className= "lg:w-1/2 sm: w-full">
              <p className="text-xl font-semibold text-gray-700 mt-5">Endereço</p>
              <div className="mt-4">
                <InputForm
                    labelValue="CEP"
                    placeholder="Digite o CEP"
                    value={form.cep}
                    onChange={(value) => handleChange("cep", value)}
                    onBlur={(value) => consultaCep(value)}
                    //   error={errors.cep}
                    />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <InputForm
                  labelValue={"Rua"}
                  placeholder={"Digite sua rua"}
                  value={form.rua}
                  onChange={(v) => handleChange("rua", v)}
                //   error={errors.rua}
                  />
              </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Bairro"}
                  placeholder={"Digite seu bairro"}
                  value={form.bairro}
                  onChange={(v) => handleChange("bairro", v)}
                //   error={errors.bairro}
                  />
              </div>
                  </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Cidade"}
                  placeholder={"Digite a cidade"}
                  value={form.cidade}
                  onChange={(v) => handleChange("cidade", v)}
                //   error={errors.cidade}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mt-4">
                <InputForm
                  labelValue={"Estado"}
                  placeholder={"Digite o estado"}
                  value={form.estado}
                  onChange={(v) => handleChange("estado", v)}
                //   error={errors.estado}
                  />
              </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Número"}
                  placeholder={"Digite o nº da área"}
                  value={form.numero}
                  type="number"
                  onChange={(v) => handleChange("numero", v === "" ? "" : Number(v))}
                  />
              </div>
                  </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Complemento"}
                  placeholder={"Digite o complemento"}
                  value={form.complemento}
                  onChange={(v) => handleChange("complemento", v)}
                //   error={errors.complemento}
                />
              </div>
            </div>

          {/* <div className="grid gap-3">
            <Label>Latitude</Label>
            <Input value={form.lat} disabled />
          </div>

          <div className="grid gap-3">
            <Label>Longitude</Label>
            <Input value={form.lon} disabled />
          </div> */}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>

          <Button onClick={handleCreate}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
