export function Card({ children, className = "" }) {
  return (
    <div className={`border rounded shadow p-4 bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

// components/ui/button.tsx

export function Button({
  children,
  onClick,
  size = "md",
  className = "",
  ...props
}) {
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white rounded hover:bg-blue-700 ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
