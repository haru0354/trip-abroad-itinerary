"use client";

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

type ArticleContentAreaProps = {
  content: string;
};

const ArticleContentArea: React.FC<ArticleContentAreaProps> = ({ content }) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    const sanitized = DOMPurify.sanitize(content);
    setSanitizedContent(sanitized);
  }, [content]);

  return <>{parse(sanitizedContent)}</>;
};
export default ArticleContentArea;
