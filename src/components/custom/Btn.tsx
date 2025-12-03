import { Button } from "../ui/button";

interface BtnProps {
    value: React.ReactNode;
    onClick?: () => void;
}

function Btn({value, onClick}: BtnProps) {
  return (
    <div>
      <Button
        className="w-full active:scale-[.98] py-4 md:py-6 lg:py-7 rounded-xl text-white text-lg font-bold cursor-pointer bg-[#3f6874] hover:bg-[#578d9e] shadow-xl"
         onClick={onClick}
      >
        {value}
      </Button>
    </div>
  );
}

export default Btn;
