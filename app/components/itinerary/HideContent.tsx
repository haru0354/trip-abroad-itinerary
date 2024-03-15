"use client";

import { useState } from "react";
import ButtonImage from "../ui/ButtonImage";

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
              <ButtonImage
                onClick={toggleShowContent}
                icon="up"
                size="small"
                className="m-auto py-1 mt-4 mb-2"
                iconClassName="mr-2 w-[12px] h-[12px]"
              >
                閉じる
              </ButtonImage>
            </>
          ) : (
            <ButtonImage
              onClick={toggleShowContent}
              icon="down"
              size="small"
              className="m-auto py-1 mt-4 mb-2"
              iconClassName="mr-2 w-[12px] h-[12px]"
            >
              補足情報を開く
            </ButtonImage>
          )}
        </>
      )}
    </>
  );
};

export default HideContent;
