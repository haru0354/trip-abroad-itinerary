import { addItinerary } from "../action/action-itinerary";
import FormItinerary from "../components/itinerary/FormItinerary";
import ListItinerary from "../components/itinerary/ListItinerary";
import Button from "../components/Button";

const page = async () => {
  return (
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <form action={addItinerary}>
              <FormItinerary />
              <Button className="btn blue mx-auto">追加</Button>
            </form>
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
