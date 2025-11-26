import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface BtnProps {
  value: React.ReactNode;
  onConfirm?: () => void;
}

function DeleteBtn({ value, onConfirm }: BtnProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="active:scale-[.98] md:py-4 lg:py-2 rounded-xl text-white text-base font-bold cursor-pointer bg-red-500 hover:bg-red-700 shadow-xl"
        >
          {value}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é irreversível. Isso excluirá o registro permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-700 cursor-pointer" onClick={onConfirm}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBtn;
