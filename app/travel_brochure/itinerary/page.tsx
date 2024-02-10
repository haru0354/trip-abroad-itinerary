import { addItinerary } from "../../action/action-itinerary";
import FormItinerary from "../../components/itinerary/FormItinerary";
import ListItinerary from "../../components/itinerary/ListItinerary";
import getCurrentUser from "@/app/action/getCurrentUser";

const page = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id

  return (
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <FormItinerary buttonName="追加" formAction={addItinerary} userId={userId} />
          </div>
          <div>
            <ListItinerary userId={userId} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
