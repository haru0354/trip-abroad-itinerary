"use client";

import { useState } from "react"
import Button from "../Button";

type Itinerary = {
  hideContent: string;
  isShowContent: boolean;
};

type HideContentProps = {
  itinerary?: Itinerary;
};

const HideContent: React.FC<HideContentProps> = ({ itinerary }) => {

  const [ isShowContent, setIsShowContent ] = useState<boolean>(false);

  const toggleShowContent = () => {
    setIsShowContent((isShowContent) => !isShowContent)
  };

  return (
    <>
    {itinerary && itinerary.hideContent && (
        <>
          {isShowContent ? (
            <>
              <p>{itinerary?.hideContent}</p>
              <Button onClick={toggleShowContent}>閉じる</Button>
            </>
          ) : (
            <Button onClick={toggleShowContent}>補足情報を開く</Button>
          )}
        </>
      )}
    </>
  );
}

export default HideContent;