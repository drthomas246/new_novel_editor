import { CharacterForm } from "@/components/characters/CharacterForm";
import { CharacterRadarChart } from "@/components/characters/CharacterRadarChart";
import PersonalityDiagnoseModal from "@/components/characters/PersonalityDiagnoseModal";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useCharacter } from "@/hooks/useCharacter";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CharacterEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { character, setCharacter, chartData, saveCharacter } =
    useCharacter(id);
  const [showModal, setShowModal] = useState(false);

  if (!character) return <div className="text-center p-6">読み込み中...</div>;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string | boolean } }
  ) => {
    const { name, value } = e.target as { name: string; value: any };
    setCharacter((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">キャラクター編集</h1>

      <CharacterForm character={character} onChange={handleChange} />
      <CharacterRadarChart data={chartData} />

      <Button
        className="bg-purple-600 hover:bg-purple-700 w-full"
        onClick={() => setShowModal(true)}
      >
        診断を実行
      </Button>

      <div className="flex justify-between">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={saveCharacter}
        >
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
