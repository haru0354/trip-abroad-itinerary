"use client";

import { useState } from "react";
import ButtonImage from "@/app/components/ui/button/ButtonImage";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SplitTextLines from "@/app/(memorybook)/memorybook/lib/SplitTextLines";

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
    setIsShowContent(!isShowContent);
  };

  return (
    <>
      {itinerary && itinerary.hideContent && (
        <>
          {isShowContent ? (
            <>
              <AnimatedItem
                elementType="div"
                animation="fadeInAndScaleVariants"
                className="border border-dashed border-itinerary-borderBlack rounded p-4 mt-6"
              >
                <p>
                  <SplitTextLines text={itinerary?.hideContent} />
                </p>
              </AnimatedItem>
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
