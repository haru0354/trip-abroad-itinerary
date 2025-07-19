type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-500 hover:text-white bg-gray-300 hover:bg-gray-400 transition-colors ${className}`}
      aria-label="モーダルを閉じる"
    >
      ×
    </button>
  );
};

export default CloseButton;
