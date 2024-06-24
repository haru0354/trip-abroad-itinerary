"use client";

import { useEffect, useState } from "react";
import GenerateToc from "../lib/GenerateToc";

type TocItem = {
  id: string;
  text: string;
};

type TableOfContentsProps = {
  content: string | null;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    if (content) {
      setToc(GenerateToc(content));
    }
  }, [content]);

  return (
    <div>
      <h2>目次</h2>
      <ul>
        {toc.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
