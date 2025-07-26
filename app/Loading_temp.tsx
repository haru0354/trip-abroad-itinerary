const Loading = ({ message }: { message?: string }) => {
  return (
    <>
      <div className="text-lg mt-5 text-gray-700 font-bold text-center">
        Loading(読み込み中)
        {message && <p>{message}を読み込み中です。</p>
        }
      </div>
    </>
  );
};

export default Loading;
