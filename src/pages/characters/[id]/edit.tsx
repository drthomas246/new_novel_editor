import PersonalityDiagnoseModal from "@/components/characters/PersonalityDiagnoseModal";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CharacterEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get("/api/my-characters")
        .then((res: any) => {
          const found = res.data.find((c: any) => c.id === id);
          if (found) setCharacter(found);
          else console.error("Character not found");
        })
        .catch((err: any) => console.error(err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios
      .put(`/api/characters/${id}`, character)
      .then(() => router.push("/mypage/characters"))
      .catch((err: any) => console.error(err));
  };

  const handleDiagnose = () => {
    setShowModal(true);
  };

  if (!character) return <div className="text-center p-6">読み込み中...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">キャラクター編集</h1>

      <label className="block">
        名前:
        <input
          name="name"
          value={character.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block">
        画像URL:
        <input
          name="imageUrl"
          value={character.imageUrl}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>
      <img
        src={character.imageUrl}
        alt="preview"
        className="w-full h-40 object-cover rounded"
      />

      <label className="block">
        性格:
        <input
          name="personality"
          value={character.personality}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block">
        役職:
        <input
          name="role"
          value={character.role}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </label>

      <label className="block">
        公開ステータス:
        <select
          name="isPublic"
          value={character.isPublic}
          onChange={(e) =>
            setCharacter((prev) => ({
              ...prev,
              isPublic: e.target.value === "true",
            }))
          }
          className="w-full border rounded p-2 mt-1"
        >
          <option value="true">公開</option>
          <option value="false">非公開</option>
        </select>
      </label>

      <Button
        className="bg-purple-600 hover:bg-purple-700 w-full"
        onClick={handleDiagnose}
      >
        診断を実行
      </Button>

      <div className="flex justify-between">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
          保存
        </Button>
        <Button
          className="bg-gray-500 hover:bg-gray-600"
          onClick={() => router.push("/mypage/characters")}
        >
          キャンセル
        </Button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PersonalityDiagnoseModal />
        </Modal>
      )}
    </div>
  );
}
