import { LabelProps as Props } from "./Label.interface";

const Label = ({ children, htmlFor }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {children}
    </label>
  );
};

export default Label;
