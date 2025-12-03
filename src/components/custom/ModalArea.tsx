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
      <DialogContent className="bg-[#AAD3DF] rounded-xl inset-shadow-sm shadow-md border border-[#E3F1F4] max-h-full overflow-y-auto">
        <DialogHeader className="p-2">
          <DialogTitle className="text-2xl font-semibold text-gray-800">Criar Área</DialogTitle>
          <DialogDescription className="text-gray-700 text-base">
            Informe os dados da área e clique em salvar.
          </DialogDescription>
        </DialogHeader>
        <div className="p-0.5 bg-gray-700 rounded-4xl"></div>
        <div className="grid gap-2">
          <div className="mt-2">
                <InputForm
                    labelValue="Título"
                    placeholder="Digite o título da área"
                    value={form.titulo}
                    onChange={(v) => handleChange("titulo", v)}
                    //   error={errors.cep}
                    />
              </div>
              <div className="mt-4">
                <InputForm
                    labelValue="Descrição"
                    placeholder="Digite a descrição da área"
                    value={form.descricao}
                    onChange={(v) => handleChange("descricao", v)}
                    //   error={errors.cep}
                    />
              </div>
           <div className= "sm: w-full">
              <p className="text-xl font-semibold text-gray-700 mt-5">Endereço</p>
              <div className="mt-4">
                <InputForm
                    labelValue="CEP"
                    placeholder="Digite o CEP"
                    value={form.cep}
                    onChange={(value) => handleChange("cep", value)}
                    onBlur={(value) => consultaCep(value)}
                    />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <InputForm
                  labelValue={"Rua"}
                  placeholder={"Digite sua rua"}
                  value={form.rua}
                  onChange={(v) => handleChange("rua", v)}
                  />
              </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Bairro"}
                  placeholder={"Digite seu bairro"}
                  value={form.bairro}
                  onChange={(v) => handleChange("bairro", v)}
                  />
              </div>
                  </div>
              <div className="mt-4">
                <InputForm
                  labelValue={"Cidade"}
                  placeholder={"Digite a cidade"}
                  value={form.cidade}
                  onChange={(v) => handleChange("cidade", v)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="mt-4">
                <InputForm
                  labelValue={"Estado"}
                  placeholder={"Digite o estado"}
                  value={form.estado}
                  onChange={(v) => handleChange("estado", v)}
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
                />
              </div>
            </div>
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
