import ImagePreview from "@/components/common/ImagePreview";
import SelectField from "@/components/common/SelectField";
import TextField from "@/components/common/TextField";

export function CharacterForm({ character, onChange }: any) {
  return (
    <>
      <TextField
        label="名前"
        name="name"
        value={character.name}
        onChange={onChange}
      />
      <ImagePreview url={character.imageUrl} onChange={onChange} />
      <TextField
        label="役職"
        name="role"
        value={character.role}
        onChange={onChange}
      />
      <TextField
        label="性格"
        name="personality"
        value={character.personality}
        onChange={onChange}
      />
      <TextField
        label="人格の根幹"
        name="corePersonality"
        value={character.corePersonality}
        onChange={onChange}
      />
      <TextField
        label="行動理念"
        name="actionPhilosophy"
        value={character.actionPhilosophy}
        onChange={onChange}
      />
      <SelectField
        label="公開ステータス"
        name="isPublic"
        value={character.isPublic}
        onChange={(e) =>
          onChange({
            target: {
              name: e.target.name,
              value: e.target.value === "true",
            },
          })
        }
      />
    </>
  );
}
