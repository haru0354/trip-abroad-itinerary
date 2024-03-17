"use Client";

import SignupButton from "../ui/SignupButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import AnimatedItem from "../lib/AnimatedItem";

type SectionCTAProps = {
  title: string;
  name1: string;
  name2: string;
  name3: string;
  content: string;
};

const SectionCTA: React.FC<SectionCTAProps> = ({
  title,
  content,
  name1,
  name2,
  name3,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white py-6 px-4">
        <AnimatedItem
          elementType="h3"
          className="text-gray-700  w-[90%] py-2 text-2xl font-semibold border-b border-sky-700 text-center"
        >
          {title}
        </AnimatedItem>
        <AnimatedItem elementType="div">
          <ul className="my-12 p-6 border border-dashed border-gray-500">
            <li className="mb-4 text-red-500">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-sky-700 mr-4"
              />
              {name1}
            </li>
            <li className="mb-4 text-red-500">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-sky-700 mr-4"
              />
              {name2}
            </li>
            <li className="text-red-500">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-sky-700 mr-4"
              />
              {name3}
            </li>
          </ul>
          <p className="text-center text-gray-700 mb-6">{content}</p>
          <div className="text-center py-4">
            <SignupButton />
          </div>
        </AnimatedItem>
      </div>
    </>
  );
};

export default SectionCTA;
