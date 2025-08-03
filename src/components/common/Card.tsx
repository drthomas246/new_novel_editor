export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`${className}`}>{children}</div>;
}
