import { Input } from "../ui/input";

interface inputFormProps {
  labelValue?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  error?: string;
  disabled?: boolean;
  onBlur?: (value: string) => void;
  onChange: (value:string) => void
}

const InputForm = ({ labelValue, placeholder, value, type, error, onChange, disabled, onBlur }: inputFormProps) => {
  return (
    <div>
      <label className="text-base md:text-lg font-medium">{labelValue}</label>
      <Input
        className="flex bg-gray-50 text-sm w-full p-3 md:p-4 lg:p-5 rounded-xl"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
        disabled = {disabled}
      />
      {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
    </div>
  );
};

export default InputForm;
