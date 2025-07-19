import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

import { getTrips } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import AddTripModal from "./AddTripModal";
import ButtonImageLink from "@/app/components/ui/button/ButtonImageLink";

const ListTrip = async () => {
  const trips = await getTrips();

  const sortedTrips = trips?.sort((a, b) => {
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
      <h2 className="bg-itinerary-heading">旅行のしおり一覧</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 place-items-center">
        {sortedTrips?.map((trip) => {
          return (
            <div
              key={trip.id}
              className="group flex flex-col items-center w-full max-w-[330px] mb-6 "
            >
              <div className="ml-auto">
                <ButtonImageLink
                  href={`/memorybook/${trip.id}`}
                  className="py-1 rounded"
                  size="small"
                  icon="pen"
                  iconClassName="mr-2"
                >
                  編集
                </ButtonImageLink>
              </div>
              <Link
                href={`/memorybook/${trip.id}/itinerary`}
                className="w-full"
              >
                <div className="flex flex-col w-full max-w-[330px] px-8 py-12 border-2 shadow-xl rounded border-sky-600 bg-white hover:-translate-y-5 transition duration-300">
                  <span className="flex justify-center mb-6 text-blue-500">
                    <FontAwesomeIcon
                      icon={faPlaneDeparture}
                      style={{ fontSize: "2em" }}
                    />
                  </span>
                  <div className="flex items-center justify-center min-h-[110px] ">
                    <h3 className="mb-6 text-center text-xl font-semibold">
                      {trip.name}
                    </h3>
                  </div>
                  <ul>
                    <li>出発日：{trip.startDate}</li>
                    <li>帰宅日：{trip.endDate}</li>
                    <li>旅行先：{trip.destination}</li>
                  </ul>
                </div>
              </Link>
            </div>
          );
        })}
        <AddTripModal />
      </div>
    </>
  );
};

export default ListTrip;
