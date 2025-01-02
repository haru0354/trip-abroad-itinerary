"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { addGenerateContentId } from "@/app/(blog)/lib/generateToc";
import TableOfContents from "@/app/components/blog/TableOfContents";
import DesignComponents from "@/app/(blog)/components/design-components/DesignComponents";

type ArticleContentAreaProps = {
  content: string;
};

const ArticleContentArea: React.FC<ArticleContentAreaProps> = ({ content }) => {
  const [idContent, setIdContent] = useState("");
  const [beforeContent, setBeforeContent] = useState("");
  const [afterContent, setAfterContent] = useState("");
  const [sanitizedBeforeContent, setSanitizedBeforeContent] = useState("");
  const [sanitizedAfterContent, setSanitizedAfterContent] = useState("");

  // 目次の為にIDを付与
  useEffect(() => {
    if (content) {
      const id = addGenerateContentId(content);
      setIdContent(id);
    }
  }, [content]);

  // 最初のh2タグの部分で分離
  useEffect(() => {
    if (idContent) {
      const h2Index = idContent.indexOf("<h2");
      if (h2Index !== -1) {
        const before = idContent.slice(0, h2Index);
        const after = idContent.slice(h2Index);

        setBeforeContent(before);
        setAfterContent(after);
      } else {
        setBeforeContent("idContent");
        setAfterContent(idContent);
      }
    }
  }, [idContent]);

  useEffect(() => {
    if (beforeContent) {
      const sanitized = DOMPurify.sanitize(beforeContent, {
        ADD_TAGS: ["next"],
        ADD_ATTR: ["href"]
      });
      const formattedContent = sanitized.replace(/\n/g, "<br>");
      setSanitizedBeforeContent(formattedContent);
    }
  }, [beforeContent]);

  useEffect(() => {
    if (afterContent) {
      const sanitized = DOMPurify.sanitize(afterContent, {
        ADD_TAGS: ["next"],
        ADD_ATTR: ["href"]
      });
      const formattedContent = sanitized.replace(/\n/g, "<br>");
      setSanitizedAfterContent(formattedContent);
    }
  }, [afterContent]);

  return (
    <>
      {parse(sanitizedBeforeContent, { replace: DesignComponents })}
      <TableOfContents content={content} />
      {parse(sanitizedAfterContent, { replace: DesignComponents })}
    </>
  );
};

export default ArticleContentArea;
