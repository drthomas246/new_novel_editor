interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

interface ImagePreviewProps {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
