import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ, faA } from "@fortawesome/free-solid-svg-icons";

type QAProps = {
  title: string;
  content: string;
};

const QA: React.FC<QAProps> = ({ title, content }) => {
  return (
    <>
      <div className="border border-sky-600 my-10 p-8 rounded ">
        <div className="flex items-center mb-4 w-full">
          <FontAwesomeIcon icon={faQ} className="mr-4" />
          <h3 className="border-b border-dashed border-gray-600 py-2 w-full">
            {title}
          </h3>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faA} className="mr-4" />
          <p className="py-4 leading-loose">{content}</p>
        </div>
      </div>
    </>
  );
};

export default QA;
