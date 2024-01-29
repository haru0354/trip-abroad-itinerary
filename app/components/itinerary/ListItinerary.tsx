import prisma from "../lib/prisma";
import Button from "../Button";
import Link from "next/link";
import HideContent from "./HideContent";

type Itinerary = {
  date: string;
  time: string;
};

const ListItinerary = async () => {
  const itinerary = await prisma.itinerary.findMany();
  const sortItineraryByDateTime = (a: Itinerary, b: Itinerary) =>
    new Date(a.date + " " + a.time).getTime() -
    new Date(b.date + " " + b.time).getTime();

  const sortedItinerary = itinerary.sort(sortItineraryByDateTime);

  return (
    <div>
      <h2>旅程表</h2>
      {sortedItinerary.map((itinerary, index) => {
        const isFirstItem =
          index === 0 || itinerary.date !== sortedItinerary[index - 1].date;
        return (
          <div key={itinerary.id}>
            {isFirstItem && <div className="bg-green-300 text-xl bold mb-2">{itinerary.date}</div>}
            <p>{itinerary.time}</p>
            <p>{itinerary.name}</p>
            <p>{itinerary.content}</p>
            <HideContent itinerary={itinerary} />
            <Link href={`/itinerary/${itinerary.id}`}>
              <Button>編集</Button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ListItinerary;
