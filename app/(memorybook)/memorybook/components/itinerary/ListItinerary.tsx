import Image from "next/image";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HideContent from "./HideContent";
import Manual from "../Manual";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import AnimatedImage from "@/app/lib/animation/AnimatedImage";
import SplitTextLines from "@/app/(memorybook)/memorybook/lib/SplitTextLines";
import ButtonImageLink from "@/app/components/ui/button/ButtonImageLink";

import type { Itinerary } from "@prisma/client";

type ListItineraryProps = {
  itineraries: Itinerary[] | undefined;
  isShare?: boolean;
};

const ListItinerary: React.FC<ListItineraryProps> = ({
  itineraries,
  isShare,
}) => {
  const sortItineraryByDateTime = (a: Itinerary, b: Itinerary) =>
    new Date(a.date + " " + a.time).getTime() -
    new Date(b.date + " " + b.time).getTime();

  const sortedItineraries = itineraries?.sort(sortItineraryByDateTime);

  if (sortedItineraries && sortedItineraries.length === 0) {
    return (
      <>
        <Manual
          title="旅程表の使い方"
          content="このページでは旅程表を登録することができます。"
          explanation="まずは試しに登録をしてみてください。"
          lists={[
            "「いつ・何をするのか」登録をしていきましょう。",
            "補足情報には色々とメモしたい項目を登録できます。",
          ]}
        />
        <p className="pt-6 font-bold text-center">サンプル</p>
        <Image
          src="/sample-itinerary.jpg"
          alt="旅程表のサンプル"
          width={480}
          height={330}
          style={{
            width: "480px",
            height: "auto",
          }}
          className="mx-auto block"
        />
      </>
    );
  }

  return (
    <div>
      <h2 className="bg-itinerary-heading text-center">旅程表</h2>
      {sortedItineraries?.map((itinerary, index) => {
        const isFirstItem =
          index === 0 || itinerary.date !== sortedItineraries[index - 1].date;
        return (
          <div key={itinerary.id} className="w-full min-w-[280px] sm:min-w-0">
            {isFirstItem && (
              <div className="flex items-center justify-start md:justify-center border-b border-sky-600 text-xl text-center font-bold mb-1 mt-10">
                {itinerary.date}
                <AnimatedImage
                  src="/date-animation.png"
                  width="60"
                  height="60"
                  alt="旅行中の犬"
                  animation="fadeInRightImage"
                  className="ml-4"
                />
              </div>
            )}
            <AnimatedItem
              elementType="div"
              animation="fadeInLeftVariants"
              className="flex w-full"
            >
              <div className="relative flex items-center justify-center text-white ">
                <FontAwesomeIcon
                  icon={faCircleDown}
                  className="z-20 bg-blue-500 w-[16px] h-[16px]"
                />
                <div className="absolute inset-0 flex items-center justify-center h-full w-4 z-10">
                  <div className="h-full w-1 bg-blue-100"></div>
                </div>
              </div>
              <div className="relative w-full ml-4 md:ml-8  my-2 border shadow rounded border-gray-200 bg-gray-50">
                {isShare || (
                  <ButtonImageLink
                    href={`/memorybook/${itinerary.tripId}/itinerary/${itinerary.id}`}
                    className="absolute top-0 right-0 rounded"
                    size="small"
                    icon="pen"
                    iconClassName="mr-2 z-[400]"
                  >
                    編集
                  </ButtonImageLink>
                )}
                <div className="flex w-full mb-2 flex-wrap md:flex-nowrap">
                  {itinerary && itinerary.url && itinerary.altText && (
                    <div className="w-full max-w-[260px] mx-auto md:m-0">
                      <Image
                        src={itinerary.url}
                        alt={itinerary.altText}
                        width={260}
                        height={180}
                      />
                    </div>
                  )}
                  <div className="flex flex-col px-4">
                    <h3 className="my-4 text-xl font-semibold">
                      {itinerary.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="inline-block mr-2 w-[16px] h-[16px]"
                      />
                      <p className="mb-0 inline-block">{itinerary.time}</p>
                    </div>
                    <div className="flex">
                      <p>
                        <SplitTextLines text={itinerary.content || ""} />
                      </p>
                    </div>
                  </div>
                </div>
                {itinerary && itinerary.hideContent && (
                  <HideContent hideContent={itinerary.hideContent} />
                )}
              </div>
            </AnimatedItem>
          </div>
        );
      })}
    </div>
  );
};

export default ListItinerary;
