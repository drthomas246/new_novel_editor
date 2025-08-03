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

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  className?: string;
}

type BaseItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type LinkItem = BaseItem & {
  href: string;
};

type ButtonItem = BaseItem & {
  href?: undefined;
};

type DropdownItem = LinkItem | ButtonItem;

type AvatarDropdownProps = {
  avatarSrc: string;
  name: string;
  bio: string;
  items: DropdownItem[];
  className?: string;
};
