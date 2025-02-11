export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}
