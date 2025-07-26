'use client';

const Loading = ({ message }: { message?: string }) => {
  return (
    <div className="my-6 text-center text-lg">
      <p className="font-semibold">Loading(読み込み中です...)</p>
      {message && <p>{message}を読み込んでいます。</p>}
    </div>
  );
};

export default Loading;
