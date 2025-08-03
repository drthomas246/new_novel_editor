export function Button({
  children,
  onClick,
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const sizes: Record<"sm" | "md" | "lg", string> = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`block rounded-md bg-fuchsia-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-fuchsia-800 cursor-pointer ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
