import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

type ManualProps = {
  title: string;
  content: string;
  lists: string[];
  explanation: string;
};

const Manual: React.FC<ManualProps> = ({
  title,
  content,
  lists,
  explanation,
}) => {
  return (
    <>
      <h2 className="bg-itinerary-heading text-xl bold text-white mt-10 mb-10 p-5 rounded">
        {title}
      </h2>
      <p>{content}</p>
      <ul className="my-6 p-4 border">
        {lists?.map((list) => (
          <li className="flex py-3 px-2 text-red-500  ">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-sky-700 mr-4 w-5 h-4 mt-1"
              style={{ width: "15px" }}
            />
            {list}
          </li>
        ))}
      </ul>
      <p>{explanation}</p>
      <div className="flex flex-col justify-center items-center w-full my-6 p-4 text-center border border-dashed border-itinerary-borderBlack ">
        <p>画面最下部のメニュー「追加」より登録ができます。</p>
        <Image
          src="/manual.JPG"
          alt="マニュアル"
          width={347}
          height={57}
          style={{
            width: "347px",
            height: "auto",
          }}
        />
      </div>
    </>
  );
};

export default Manual;
