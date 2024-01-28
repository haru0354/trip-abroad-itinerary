import { addItinerary } from "../action/action-itinerary";
import FormItinerary from "../components/itinerary/FormItinerary";
import ListItinerary from "../components/itinerary/ListItinerary";
import Button from "../components/Button";

const page = async () => {
  return (
    <main>
      <div>
        <form action={addItinerary}>
          <FormItinerary />
          <Button>追加</Button>
        </form>
      </div>
      <div>
        <ListItinerary />
      </div>
    </main>
  );
};

export default page;
