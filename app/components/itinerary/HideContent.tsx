"use client";

import { useState } from "react";
import Button from "../ui/Button";
import {
  faSquareCaretDown,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Itinerary = {
  hideContent: string | null;
  isShowContent: boolean | null;
};

type HideContentProps = {
  itinerary?: Itinerary;
};

const HideContent: React.FC<HideContentProps> = ({ itinerary }) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const toggleShowContent = () => {
    setIsShowContent((isShowContent) => !isShowContent);
  };

  return (
    <>
      {itinerary && itinerary.hideContent && (
        <>
          {isShowContent ? (
            <>
              <div className="border border-dashed border-gray-500 rounded p-4 mt-6">
                <p className="text-gray-700">{itinerary?.hideContent}</p>
              </div>
              <Button
                onClick={toggleShowContent}
                className="btn-small block m-auto py-1 my-4"
              >
                <FontAwesomeIcon icon={faSquareCaretUp} />
                閉じる
              </Button>
            </>
          ) : (
            <Button
              onClick={toggleShowContent}
              className="btn-small m-auto py-1 mt-4 mb-2"
            >
              <FontAwesomeIcon
                icon={faSquareCaretDown}
                className="mr-2 w-auto inline-block"
              />
              補足情報を開く
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default HideContent;
