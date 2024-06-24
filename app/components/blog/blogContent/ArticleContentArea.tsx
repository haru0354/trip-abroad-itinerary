"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { AddGenerateContentId } from "../../lib/GenerateToc";

type ArticleContentAreaProps = {
  content: string;
};

const ArticleContentArea: React.FC<ArticleContentAreaProps> = ({ content }) => {
  const [idContent, setIdContent] = useState("");
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (content) {
      setIdContent(AddGenerateContentId(content));
    }
  }, [content]);


  useEffect(() => {
    const sanitized = DOMPurify.sanitize(idContent);
    const formattedContent = sanitized.replace(/\n/g, "<br>");
    setSanitizedContent(formattedContent);
  }, [idContent]);

  return <>{parse(sanitizedContent)}</>;
};
export default ArticleContentArea;
