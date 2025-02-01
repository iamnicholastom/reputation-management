import Label from "../Label/Label";
import { InputProps } from "./Input.interface";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  htmlFor,
}: InputProps) => {
  return (
    <>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      <input
        id={htmlFor}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </>
  );
};

export default Input;
