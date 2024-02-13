import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faPlaneDeparture,
  faCartFlatbedSuitcase,
} from "@fortawesome/free-solid-svg-icons";

type Section3ColumnProps = {
  title: string;
  name1: string;
  name2: string;
  name3: string;
  content1: string;
  content2: string;
  content3: string;
};

const Section3Column: React.FC<Section3ColumnProps> = ({
  title,
  name1,
  name2,
  name3,
  content1,
  content2,
  content3,
}) => {
  return (
    <div className="w-full my-20 py-10 bg-white rounded">
      <div className="text-center my-6">
        <h2 className="text-2xl my-10 text-gray-700 mb-6 font-semibold">
          {title}
        </h2>
      </div>
      <div className="flex w-full">
        <div className="border-2 border-sky-600 rounded w-[32%] mx-3 p-4 flex flex-col ">
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon icon={faEarthAsia} style={{ fontSize: "2em" }} />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name1}
          </h3>
          <p className="text-gray-700 mb-6">{content1}</p>
        </div>
        <div className="border-2 border-sky-600 rounded w-[32%] mx-3 p-4 flex flex-col ">
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              style={{ fontSize: "2em" }}
            />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name2}
          </h3>
          <p className="text-gray-700 mb-6">{content2}</p>
        </div>
        <div className="border-2 border-sky-600 rounded w-[32%] mx-3 p-4 flex flex-col ">
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon
              icon={faCartFlatbedSuitcase}
              style={{ fontSize: "2em" }}
            />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name3}
          </h3>
          <p className="text-gray-700 mb-6">{content3}</p>
        </div>
      </div>
    </div>
  );
};

export default Section3Column;
