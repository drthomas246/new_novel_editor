type Props = {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ImagePreview({ url, onChange }: Props) {
  return (
    <>
      <label className="block">
        画像URL:
        <input
          name="imageUrl"
          value={url}
          onChange={onChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>
      <img
        src={url}
        alt="preview"
        className="w-full h-64 object-contain rounded"
      />
    </>
  );
}
