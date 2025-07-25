type Props = {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectField({ label, name, value, onChange }: Props) {
  return (
    <label className="block">
      {label}:
      <select
        name={name}
        value={String(value)}
        onChange={onChange}
        className="w-full border rounded p-2 mt-1"
      >
        <option value="true">公開</option>
        <option value="false">非公開</option>
      </select>
    </label>
  );
}
