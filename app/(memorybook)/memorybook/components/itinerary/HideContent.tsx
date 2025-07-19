"use client";

import { useState } from "react";

import ButtonImage from "@/app/components/ui/button/ButtonImage";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import SplitTextLines from "@/app/(memorybook)/memorybook/lib/SplitTextLines";

type HideContentProps = {
  hideContent: string;
};

const HideContent: React.FC<HideContentProps> = ({ hideContent }) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const toggleShowContent = () => {
    setIsShowContent((prev) => !prev);
  };

  return (
    <>
      {hideContent && (
        <>
          {isShowContent ? (
            <>
              <AnimatedItem
                elementType="div"
                animation="fadeInAndScaleVariants"
                className="mx-2 md:mx-8 mt-2 md:mt-6 p-2 md:p-4 border border-dashed border-itinerary-borderBlack rounded"
              >
                <p className="mb-0">
                  <SplitTextLines text={hideContent} />
                </p>
              </AnimatedItem>
              <ButtonImage
                onClick={toggleShowContent}
                icon="up"
                size="small"
                type="button"
                className="mx-auto py-1 mt-4 mb-2"
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
              type="button"
              className="mx-auto py-1 mt-4 mb-2"
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
