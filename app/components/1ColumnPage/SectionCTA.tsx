import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type SectionCTAProps = {
  name1: string;
  name2: string;
  name3: string;
  content: string;
};

const SectionCTA: React.FC<SectionCTAProps> = ({
  name1,
  name2,
  name3,
  content,
}) => {
  return (
      <AnimatedItem elementType="div" animation="fadeInVariants">
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
      </AnimatedItem>
  );
};

export default SectionCTA;
