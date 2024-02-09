import { addItinerary } from "../../action/action-itinerary";
import FormItinerary from "../../components/itinerary/FormItinerary";
import ListItinerary from "../../components/itinerary/ListItinerary";

const page = async () => {
  return (
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <FormItinerary buttonName="追加" formAction={addItinerary} />
          </div>
          <div>
            <ListItinerary />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
