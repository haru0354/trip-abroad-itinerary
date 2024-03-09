import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faPlaneDeparture,
  faCartFlatbedSuitcase,
} from "@fortawesome/free-solid-svg-icons";

type Section3ColumnIconProps = {
  title: string;
  name1: string;
  name2: string;
  name3: string;
  content1: string;
  content2: string;
  content3: string;
};

const Section3ColumnIcon: React.FC<Section3ColumnIconProps> = ({
  title,
  name1,
  name2,
  name3,
  content1,
  content2,
  content3,
}) => {
  return (
    <div className="w-full py-4 bg-white rounded">
      <div className="text-center my-6">
      <h2 className="bg-blue-400 text-xl font-semibold text-white rounded my-10 p-5">
          {title}
        </h2>
      </div>
      <div className="flex w-full my-10 flex-wrap items-center justify-center">
        <div className="border-2 border-sky-600 rounded w-[30%] mx-3 my-6 px-8 py-10 flex flex-col min-w-[330px]">
          <span className="text-blue-500  flex justify-center mb-6">
            <FontAwesomeIcon icon={faEarthAsia} style={{ fontSize: "2em" }} />
          </span>
          <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
            {name1}
          </h3>
          <p className="text-gray-700 mb-6">{content1}</p>
        </div>
        <div className="border-2 border-sky-600 rounded w-[30%] mx-3 my-6 px-8 py-10 flex flex-col min-w-[330px]">
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
        <div className="border-2 border-sky-600 rounded w-[30%] mx-3 my-6 px-8 py-10 flex flex-col min-w-[330px]">
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

export default Section3ColumnIcon;
