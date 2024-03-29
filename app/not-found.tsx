import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className="text-lg py-8 text-gray-700 font-bold">404NotFound</h1>
      <p>指定されたファイルまたはディレクトリは存在しません。</p>
    </>
  );
};

export default NotFound;
