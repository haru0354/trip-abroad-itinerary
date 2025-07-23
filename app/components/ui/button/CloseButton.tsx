type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xl w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:text-white bg-zinc-100 hover:bg-gray-700 transform hover:rotate-180 duration-300 ${className}`}
      aria-label="モーダルを閉じる"
    >
      ×
    </button>
  );
};

export default CloseButton;
