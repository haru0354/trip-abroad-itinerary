"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ, faA, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type QuestionAndAnswerProps = {
  title: string;
  content: string;
};

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = ({
  title,
  content,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const toggleShowContent = () => {
    setIsShowContent((isShowContent) => !isShowContent);
  };

  return (
    <AnimatedItem
      elementType="div"
      animation="fadeInVariants"
      className="cursor-pointer w-full my-10 p-8 border rounded border-itinerary-borderBlack"
      onClick={toggleShowContent}
    >
      <div className="flex items-center w-full mb-4">
        <FontAwesomeIcon icon={faQ} className="mr-4" />
        <h3 className="w-full py-2 border-b border-dashed border-itinerary-borderBlack">
          {title}
        </h3>
        {isShowContent ? (
          <FontAwesomeIcon icon={faMinus} />
        ) : (
          <FontAwesomeIcon icon={faPlus} />
        )}
      </div>
      {isShowContent && (
        <div className="flex items-start justify-start">
          <FontAwesomeIcon icon={faA} className="mr-4 py-6" />
          <p className="py-4 leading-loose">{content}</p>
        </div>
      )}
    </AnimatedItem>
  );
};

export default QuestionAndAnswer;
