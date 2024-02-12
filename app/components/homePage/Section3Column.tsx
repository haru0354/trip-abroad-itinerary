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
    <section>
      <div>
        <div className="text-center">
          <h2>{title}</h2>
        </div>
        <div className="border border-sky-600 rounded">
          <span className="text-blue-500">
            <FontAwesomeIcon icon={faEarthAsia} />
          </span>
          <h3>{name1}</h3>
          <p>{content1}</p>
        </div>
        <div className="border border-sky-600 rounded">
          <span className="text-blue-500">
            <FontAwesomeIcon icon={faPlaneDeparture} />
          </span>
          <h3>{name2}</h3>
          <p>{content2}</p>
        </div>
        <div className="border border-sky-600 rounded">
          <span className="text-blue-500">
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
          </span>
          <h3>{name3}</h3>
          <p>{content3}</p>
        </div>
      </div>
    </section>
  );
};

export default Section3Column;
