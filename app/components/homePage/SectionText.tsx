import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type SectionTextProps = {
  title: string;
  name1: string;
  name2: string;
  name3: string;
  content: string;
};

const SectionText: React.FC<SectionTextProps> = ({
  title,
  content,
  name1,
  name2,
  name3,
}) => {
  return (
    <>
      <div className="flex items-center justify-center bg-white py-10">
        <div className="w-[70%]">
          <h3 className="text-center text-gray-700 mb-6 text-2xl font-semibold ">
            {title}
          </h3>
          <ul className="my-8">
            <li className="mb-4">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-sky-700 mr-4"
              />
              {name1}
            </li>
            <li className="mb-4">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-sky-700 mr-4"
              />
              {name2}
            </li>
            <li className="mb-4">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-sky-700 mr-4"
              />
              {name3}
            </li>
          </ul>
          <p className="text-center text-gray-700 mb-6">{content}</p>
          <Button className="btn blue">利用する</Button>
        </div>
      </div>
    </>
  );
};

export default SectionText;
