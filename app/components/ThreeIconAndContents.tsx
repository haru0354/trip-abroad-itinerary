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
    <div className="flex w-full my-10 flex-wrap items-center justify-center">
      {items.map((item, index) => (
        <AnimatedItem
          animation="fadeInVariants"
          elementType="div"
          className="border-2 border-sky-600 rounded w-[28%] mx-2 my-4 px-4 md:px-8 py-6 flex flex-col min-w-[330px] min-h-[330px]"
          delay={0.2 * (index + 1)}
          key={item.title}
        >
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon
              icon={icons[index % icons.length]}
              style={{ fontSize: "2em" }}
            />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {item.title}
          </h3>
          <p className="text-gray-700 mb-6">{item.content}</p>
        </AnimatedItem>
      ))}
    </div>
  );
};

export default ThreeIconAndContents;
