"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "@/app/components/ui/Button";

const Share = () => {
  const path = usePathname();
  const [copied, setCopied] = useState(false);

  const fullPath = `https://www.travel-memory-life.com${path}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPath);
    setCopied(true);
  };

  return (
    <>
      <div className="p-4 mt-20 mb-8 mx-10 border border-dashed border-gray-500">
        <div className="block mx-auto">
          <p className="p-4 mx-auto bg-gray-200 border-b border-gray-500 mb-6">
            {fullPath}
          </p>
          <Button
            onClick={handleCopy}
            size="small"
            color="blue"
            className="rounded"
          >
            URLをコピー
          </Button>
          {copied && <p className="text-green-600 ml-3">(コピーされました)</p>}
          <p className="mt-4">この旅程表をSNSやLINEで共有しましょう。</p>
          <p>また、旅行の同行者と旅程表を共有することもできます。</p>
        </div>
      </div>
    </>
  );
};

export default Share;
