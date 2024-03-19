"use client";
import AnimatedItem from "../lib/AnimatedItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ, faA, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type QAProps = {
  title: string;
  content: string;
};

const QA: React.FC<QAProps> = ({ title, content }) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const toggleShowContent = () => {
    setIsShowContent((isShowContent) => !isShowContent);
  };

  return (
    <>
      <AnimatedItem
        elementType="div"
        animation="fadeInVariants"
        className="border border-gray-600 my-10 p-8 rounded cursor-pointer w-full"
        onClick={toggleShowContent}
      >
        {isShowContent ? (
          <>
            <div className="flex items-center mb-4 w-full">
              <FontAwesomeIcon icon={faQ} className="mr-4" />
              <h3 className="border-b border-dashed border-gray-600 py-2 w-full">
                {title}
              </h3>
              <FontAwesomeIcon icon={faMinus} />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faA} className="mr-4" />
              <p className="py-4 leading-loose">{content}</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-4 w-full">
              <FontAwesomeIcon icon={faQ} className="mr-4" />
              <h3 className="border-b border-dashed border-gray-600 py-2 w-full">
                {title}
              </h3>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </>
        )}
      </AnimatedItem>
    </>
  );
};

export default QA;
