"use client";

import { useState } from "react";
import Button from "../Button";
import { faSquareCaretDown, faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Itinerary = {
  hideContent: string;
  isShowContent: boolean;
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
              <p>{itinerary?.hideContent}</p>
              <Button onClick={toggleShowContent} className="btn-small  m-auto">
              <FontAwesomeIcon icon={faSquareCaretUp} />
                閉じる
              </Button>
            </>
          ) : (
            <Button onClick={toggleShowContent} className="btn-small m-auto">
              <FontAwesomeIcon icon={faSquareCaretDown} className="mr-2 w-auto inline-block"/>
              補足情報を開く
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default HideContent;
