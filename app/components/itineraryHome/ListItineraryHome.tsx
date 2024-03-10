import prisma from "../lib/prisma";
import Button from "../ui/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

type ListItineraryHomeProps = {
  userId?: number | undefined;
};

const ListItineraryHome: React.FC<ListItineraryHomeProps> = async ({
  userId,
}) => {
  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      userId,
    },
  });

  const sortedItineraryHomes = itineraryHomes.sort((a, b) => {
    if (a.startDate === null && b.startDate === null) {
      return 0;
    }
    if (a.startDate === null) {
      return 1;
    }
    if (b.startDate === null) {
      return -1;
    }
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  return (
    <>
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-8 p-5">
        旅行の一覧
      </h2>
      <div className="w-full bg-white rounded">
        <div className="flex w-full my-10 flex-wrap items-center justify-center">
          {sortedItineraryHomes.map((itineraryHome) => {
            return (
              <>
                <div
                  key={itineraryHome.id}
                  className="flex flex-col items-center"
                >
                  <Link href={`/travel_brochure/${itineraryHome.id}/itinerary`}>
                    <div className="border-2 border-sky-600 rounded mx-5 my-6 px-8 py-10 flex flex-col min-w-[330px] hover:bg-sky-200">
                      <span className="text-blue-500  flex justify-center mb-6">
                        <FontAwesomeIcon
                          icon={faPlaneDeparture}
                          style={{ fontSize: "2em" }}
                        />
                      </span>
                      <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
                        {itineraryHome.name}
                      </h3>
                      <p>出発日：{itineraryHome.startDate}</p>
                      <p>帰宅日：{itineraryHome.endDate}</p>
                      <p>旅行先：{itineraryHome.destination}</p>
                    </div>
                  </Link>
                  <Link href={`/travel_brochure/${itineraryHome.id}`}>
                    <Button color="blue" size="normal">
                      編集
                    </Button>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListItineraryHome;
