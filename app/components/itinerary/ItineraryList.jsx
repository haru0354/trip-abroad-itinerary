import prisma from "../../lib/prisma";
import Button from "../button/Button.tsx";
import { deleteItinerary } from "../../action/action-itinerary";

const ItineraryList = async () => {
  const itinerary = await prisma.itinerary.findMany();

  return (
    <div>
      <h2>旅程表</h2>
      {itinerary.map(itinerary => {
        return (
          <div key={itinerary.id}>
            <div>{itinerary.date}</div>
            <div>{itinerary.time}</div>
            <div>{itinerary.name}</div>
            <div>{itinerary.content}</div>
            <div>{itinerary.hideContent}作成中は表示させておく</div>
            <Button>
              編集
            </Button>
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

export default ItineraryList