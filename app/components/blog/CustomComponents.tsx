import { DOMNode, domToReact } from "html-react-parser";
import CustomLink from "./blogDesignComponents/CustomLink";

// blogのコンテンツにコンポーネントを使用するなら追加していく

const CustomComponents = (domNode: DOMNode) => {
  if (
    domNode.type === "tag" &&
    domNode.name === "Link" &&
    domNode.attribs &&
    domNode.attribs.href
  ) {
    return (
      <CustomLink href={domNode.attribs.href}>
        {domToReact(domNode.children as DOMNode[], {
          replace: CustomComponents,
        })}
      </CustomLink>
    );
  }

  return domNode;
};

export default CustomComponents;
