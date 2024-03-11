import React from "react";
import parse from "html-react-parser";

type ArticleContentAreaProps = {
  content: string;
};

const ArticleContentArea: React.FC<ArticleContentAreaProps> = ({ content }) => {

  return <>{parse(content)}</>;
};
export default ArticleContentArea;
