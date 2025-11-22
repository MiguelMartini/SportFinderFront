import { Input } from "../ui/input";

interface inputFormProps {
  labelValue: string;
  placeholder: string;
  value: string;
  type?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (value:string) => void
}

const InputForm = ({ labelValue, placeholder, value, type, error, onChange, disabled }: inputFormProps) => {
  return (
    <div>
      <label className="text-base md:text-lg font-medium">{labelValue}</label>
      <Input
        className="bg-gray-50 text-sm w-full p-3 md:p-4 lg:p-5 rounded-xl"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        disabled = {disabled}
      />
      {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
    </div>
  );
};

export default InputForm;
