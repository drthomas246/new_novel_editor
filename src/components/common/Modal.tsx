export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow w-full max-w-2xl max-h-[66vh] overflow-y-auto p-4">
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-600 text-white rounded p-2 hover:bg-gray-700"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
