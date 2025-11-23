import { Textarea } from "../ui/textarea";

interface inputFormProps {
  labelValue: string;
  placeholder: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const TextForm = ({
  labelValue,
  placeholder,
  value,
  error,
  onChange,
  disabled,
}: inputFormProps) => {
  return (
    <div>
      <label className="text-base md:text-lg font-medium">{labelValue}</label>
      <Textarea
        className="bg-gray-50 text-sm w-full p-3 md:p-4 lg:p-5 m-2 rounded-xl whitespace-wrap"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
};

export default TextForm;
