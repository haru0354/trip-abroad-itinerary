import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type ManualProps = {
  title: string;
  content1: string;
  content2: string;
  li1: string;
  li2?: string;
  li3?: string;
};

const Manual: React.FC<ManualProps> = ({
  title,
  content1,
  content2,
  li1,
  li2,
  li3,
}) => {
  return (
    <>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-10 p-5">
        {title}
      </h2>
      <p>{content1}</p>
      <ul className="my-6 px-4 border p-4">
        <li className="flex py-3 px-2 text-red-500  ">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-sky-700 mr-4 w-5 h-4 mt-1"
            style={{ width: "15px" }}
          />
          {li1}
        </li>
        {li2 && (
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            {li2}
          </li>
        )}
        {li3 && (
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            {li3}
          </li>
        )}
      </ul>
      <p>{content2}</p>
    </>
  );
};

export default Manual;
