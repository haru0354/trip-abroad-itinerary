"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/ui/button/Button";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

const Share = () => {
  const path = usePathname();
  const [copied, setCopied] = useState(false);

  const fullPath = `https://www.travel-memory-life.com${path}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPath);
    setCopied(true);
  };

  return (
    <AnimatedItem
      elementType="div"
      animation="fadeInVariants"
      className="p-6 mt-20 mb-12 mx-6 md:mx-10 "
    >
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm font-medium mb-2">
          旅程表の共有リンク
        </p>
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 mb-4 text-sm border rounded border-gray-300 bg-gray-100">
          {fullPath}
          <Button
            onClick={handleCopy}
            size="small"
            color="blue"
            type="button"
            className="ml-4 mt-4 md:mt-0 whitespace-nowrap rounded"
          >
            コピー
          </Button>
        </div>
        {copied && (
          <AnimatedItem
            elementType="p"
            animation="fadeInAndScaleVariants"
            className="text-sm mb-4 text-green-600"
          >
            ✔ コピーされました
          </AnimatedItem>
        )}
        <p className="text-sm">
          このリンクを「SNS」や「LINE」で共有しましょう。
          <br />
          また、旅行の同行者に旅程表を共有することもできます。
        </p>
      </div>
    </AnimatedItem>
  );
};

export default Share;
