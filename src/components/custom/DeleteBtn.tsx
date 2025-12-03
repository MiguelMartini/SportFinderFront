import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface BtnProps {
  value: React.ReactNode;
  style: string;
  onConfirm?: () => void;
}

function DeleteBtn({ value, onConfirm, style }: BtnProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild >
        <Button
          className={style}
        >
          {value}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#E3F1F4] border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é irreversível. Isso excluirá o registro permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700 cursor-pointer" onClick={onConfirm}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBtn;
