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
      {sortedItinerary.map((itinerary) => {
        return (
          <div key={itinerary.id}>
            <div>{itinerary.date}</div>
            <div>{itinerary.time}</div>
            <div>{itinerary.name}</div>
            <div>{itinerary.content}</div>
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
