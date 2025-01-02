import { DOMNode, domToReact } from "html-react-parser";
import CustomLink from "./CustomLink";

// blogのコンテンツにコンポーネントを使用するなら追加していく

const DesignComponents = (domNode: DOMNode) => {
  if (
    domNode.type === "tag" &&
    domNode.name === "next" &&
    domNode.attribs &&
    domNode.attribs.href
  ) {
    return (
      <CustomLink href={domNode.attribs.href}>
        {domToReact(domNode.children as DOMNode[], {
          replace: DesignComponents,
        })}
      </CustomLink>
    );
  }

  return domNode;
};

export default DesignComponents;
