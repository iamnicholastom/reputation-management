import { ButtonProps } from "./Button.interface";

const Button = ({
  type = "button",
  isLoading = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium ${
        fullWidth ? "w-full" : ""
      } ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? "Submitting..." : children}
    </button>
  );
};

export default Button;
