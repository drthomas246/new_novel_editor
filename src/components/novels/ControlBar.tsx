const ControlBar = ({ charCount }: ControlBarProps) => (
  <div className="flex items-center justify-between p-2 border-t border-gray-300 text-sm">
    <span>🔢 字数: {charCount}</span>
    <div className="space-x-2">
      <button>💾 保存</button>
      <button>🔍 検索</button>
      <button>📄 プレビュー</button>
    </div>
  </div>
);
export default ControlBar;
