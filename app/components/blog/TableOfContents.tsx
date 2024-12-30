"use client";

import { useEffect, useState } from "react";
import { generateTocId } from "@/app/(blog)/lib/generateToc";

type TocItem = {
  id: string;
  text: string;
  tag: string;
};

type TableOfContentsProps = {
  content: string | null;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (content) {
      setToc(generateTocId(content));
    }
  }, [content]);

  return (
    <div className="w-full max-w-[500px] p-6 mx-auto my-12 border rounded border-gray-300">
      <p className="pb-1 text-center text-lg border-b  border-gray-300">
        目次
      </p>
      <ul className="list-disc list-inside border-none" style={{ border: "none", padding: 0, margin: 0 }}>
      {toc.map((item) => {
          let className = "";
          switch (item.tag) {
            case "h2":
              className = "list-none font-semibold mb-3";
              break;
            case "h3":
              className = "ml-6 mb-2 marker:text-gray-500";
              break;
            default:
              className = "list-none font-semibold mb-3";
          }

          return (
            <li key={item.id} className={className}>
              <a href={`#${item.id}`} style={{ color: "rgb(75 85 99)" }}>
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
