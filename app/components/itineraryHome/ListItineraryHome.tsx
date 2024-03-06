import prisma from "../lib/prisma";
import Button from "../ui/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
      <h2 className="bg-blue-400 text-xl bold text-white rounded mt-10 mb-12 p-5">
        旅行の一覧
      </h2>
      {sortedItineraryHomes.map((itineraryHome) => {
        return (
          <div className="bg-blue-200 shadow-md rounded px-8 py-8 mb-10 ">
            <div className="flex justify-between border-b-2 mb-2">
              <p>{itineraryHome.name}</p>
              <p>{itineraryHome.startDate}</p>
              <p>{itineraryHome.endDate}</p>
              <p>{itineraryHome.destination}</p>
              <Link href={`/travel_brochure/${itineraryHome.id}`}>
                <Button className="btn-small flex items-center">
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                  編集
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListItineraryHome;
