export function Input({ children, className = "", ...props }: InputProps) {
  return (
    <label htmlFor="Email">
      <span className="text-sm font-medium text-gray-700"> {children} </span>

      <input
        type="email"
        id="Email"
        className={`mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm px-4 py-2 ${className}`}
        {...props}
      />
    </label>
  );
}
