type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({ label, name, value, onChange }: Props) {
  return (
    <label className="block">
      {label}:
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded p-2 mt-1"
      />
    </label>
  );
}
