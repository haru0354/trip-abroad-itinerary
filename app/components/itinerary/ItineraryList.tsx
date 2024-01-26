"use client"
import Button from "../Button";
import { deleteItinerary } from "../../action/action-itinerary";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Itinerary {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string;
  hideContent: string;
  isShowContent: boolean;
}

const ItineraryList = ({ itineraryData }: { itineraryData: Itinerary[] }) => {
  const [ sortItinerary, setSortItinerary] = useState<Itinerary[]>([]);
  
  useEffect(() => {
    const sortByDateTime = (a: Itinerary, b: Itinerary) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    }
    const sortedData = [...itineraryData].sort(sortByDateTime);
    setSortItinerary(sortedData);
}, [itineraryData]);

  return (
    <div>
      <h2>旅程表</h2>
      {sortItinerary.map(itinerary => {
        return (
          <div key={itinerary.id}>
            <div>{itinerary.date}</div>
            <div>{itinerary.time}</div>
            <div>{itinerary.name}</div>
            <div>{itinerary.content}</div>
            <div>{itinerary.hideContent}作成中は表示させておく</div>
            <Link href={`/itinerary/${itinerary.id}`}>
              <Button>
                編集
              </Button>
            </Link>
            <form action={deleteItinerary}>
              <input type="hidden" name="id" value={itinerary.id} />
            <Button>
              削除
            </Button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default ItineraryList;