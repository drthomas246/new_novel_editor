interface Novel {
  id: string;
  userId: string;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

interface LabeledInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  size?: "title" | "chapter";
}

interface NovelEditorProps {
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
}

interface ControlBarProps {
  charCount: number;
}

interface TreeNode {
  id: string;
  title: string;
  subtitle?: string;
  type?: "novel" | "chapter" | "character" | "world";
  expanded?: boolean;
  children?: TreeNode[];
}
