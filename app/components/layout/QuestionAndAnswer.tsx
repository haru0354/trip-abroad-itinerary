"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ, faA, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type QuestionAndAnswerProps = {
  items: Item[];
};

type Item = {
  title: string;
  content: string;
};

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = ({ items }) => {
  const [isShowContent, setIsShowContent] = useState<number | null>(null);

  const toggleShowContent = (index: number) => {
    setIsShowContent((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item, index) => (
        <div key={index} className="w-full sm:w-[calc(50%-0.5rem)]">
          <AnimatedItem
            elementType="div"
            animation="fadeInVariants"
            className="cursor-pointer p-8 border rounded border-itinerary-borderBlack"
          >
            <div
              className="flex items-center w-full mb-4"
              onClick={() => toggleShowContent(index)}
            >
              <FontAwesomeIcon icon={faQ} className="mr-4" />
              <h3 className="w-full py-2 border-b border-dashed border-itinerary-borderBlack">
                {item.title}
              </h3>
              <FontAwesomeIcon
                icon={isShowContent === index ? faMinus : faPlus}
              />
            </div>
            {isShowContent === index && (
              <AnimatedItem
                elementType="div"
                animation="fadeInVariants"
                className="flex items-start justify-start"
              >
                <FontAwesomeIcon icon={faA} className="mr-4 py-6" />
                <p className="py-4 leading-loose">{item.content}</p>
              </AnimatedItem>
            )}
          </AnimatedItem>
        </div>
      ))}
    </div>
  );
};

export default QuestionAndAnswer;
