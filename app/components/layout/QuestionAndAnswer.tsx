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
            className=" px-2 py-2 md:p-6 border rounded-lg shadow-sm hover:shadow-xl border-itinerary-borderBlack bg-white transition-all duration-300 cursor-pointer"
            delay={0.1 * (index + 1)}
            onClick={() => toggleShowContent(index)}
          >
            <div className="flex items-center w-full mb-4">
              <div className="bg-gray-200 rounded-full p-2 mr-2 md:mr-4">
                <FontAwesomeIcon icon={faQ} />
              </div>
              <h3 className="flex-1 py-2 border-b border-dashed border-itinerary-borderBlack text-lg font-semibold">
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
                <div className="bg-gray-200 rounded-full p-2 mr-4 mt-2 hidden sm:block">
                  <FontAwesomeIcon icon={faA} />
                </div>
                <p className="py-2 leading-relaxed">{item.content}</p>
              </AnimatedItem>
            )}
          </AnimatedItem>
        </div>
      ))}
    </div>
  );
};

export default QuestionAndAnswer;
