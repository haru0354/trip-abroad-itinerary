import Button from "../ui/Button";
import Link from "next/link";
import HideContent from "./HideContent";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faClock, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

type ListItineraryProps = {
  itineraryHomeId: number | undefined;
  itineraries: Itineraries[] | undefined;
};

type Itineraries = {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string | null;
  hideContent: string | null;
  isShowContent: boolean | null;
  url: string | null;
  altText: string | null;
};

const ListItinerary: React.FC<ListItineraryProps> = async ({
  itineraryHomeId,
  itineraries,
}) => {
  const sortItineraryByDateTime = (a: Itineraries, b: Itineraries) =>
    new Date(a.date + " " + a.time).getTime() -
    new Date(b.date + " " + b.time).getTime();

  const sortedItineraries = itineraries?.sort(sortItineraryByDateTime);

  return (
    <div>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-2 p-5">
        旅程表
      </h2>
      {sortedItineraries?.map((itinerary, index) => {
        const isFirstItem =
          index === 0 || itinerary.date !== sortedItineraries[index - 1].date;
        return (
          <div key={itinerary.id}>
            {isFirstItem && (
              <div className="border-b border-sky-600 text-xl text-center bold mt-10 mb-2 p-3">
                {itinerary.date}
              </div>
            )}
            <Link
              href={`/travel_brochure/${itineraryHomeId}/itinerary/${itinerary.id}`}
            >
              <Button className="btn-small block ml-auto mb-[-8px]">
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                編集
              </Button>
            </Link>
            <div className="flex w-full ">
              <div className="relative  text-white items-center justify-center flex">
                <FontAwesomeIcon
                  icon={faCircleDown}
                  className="z-20 bg-blue-500"
                />
                <div className="h-full w-4  absolute inset-0 flex items-center justify-center z-10">
                  <div className="h-full w-1 bg-blue-100"></div>
                </div>
              </div>
              <div className="flex-1 flex-col  ml-8 my-2 p-2 shadow flex bg-sky-50">
                <div className="flex items-start  mb-2 flex-wrap md:flex-nowrap justify-center md:justify-start ">
                  {itinerary && itinerary.url && itinerary.altText && (
                    <div className="min-w-[250px] max-w-[250px]">
                      <Image
                        src={itinerary.url}
                        alt={itinerary.altText}
                        width={260}
                        height={180}
                      />
                    </div>
                  )}
                  <div className="flex flex-col px-4">
                    <h3 className="text-gray-700 my-4 text-xl font-semibold">
                      {itinerary.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="inline-block mr-2"
                      />
                      <p className="text-gray-700 mb-0 inline-block">
                        {itinerary.time}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-gray-700">{itinerary.content}</p>
                    </div>
                  </div>
                </div>
                <HideContent itinerary={itinerary} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListItinerary;
