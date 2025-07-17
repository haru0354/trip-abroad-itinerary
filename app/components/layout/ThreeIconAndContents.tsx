import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faPlaneDeparture,
  faCartFlatbedSuitcase,
} from "@fortawesome/free-solid-svg-icons";

import AnimatedItem from "@/app/lib/animation/AnimatedItem";

type ThreeIconAndContentsProps = {
  items: Item[];
};

type Item = {
  title: string;
  content: string;
};

const ThreeIconAndContents: React.FC<ThreeIconAndContentsProps> = ({
  items,
}) => {
  const icons = [faEarthAsia, faPlaneDeparture, faCartFlatbedSuitcase];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full my-4 md:my-8">
      {items.map((item, index) => (
        <AnimatedItem
          animation="fadeInVariants"
          elementType="div"
          className="h-full px-4 md:px-8 py-4 md:py-6 border-2 rounded border-sky-600"
          delay={0.2 * (index + 1)}
          key={item.title}
        >
          <span className="text-blue-500 flex justify-center mb-6">
            <FontAwesomeIcon
              icon={icons[index % icons.length]}
              style={{ fontSize: "2em" }}
            />
          </span>
          <h3 className="mb-6 text-center text-xl font-semibold">
            {item.title}
          </h3>
          <p>{item.content}</p>
        </AnimatedItem>
      ))}
    </div>
  );
};

export default ThreeIconAndContents;
