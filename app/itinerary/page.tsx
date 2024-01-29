import { addItinerary } from "../action/action-itinerary";
import FormItinerary from "../components/itinerary/FormItinerary";
import ListItinerary from "../components/itinerary/ListItinerary";
import Button from "../components/Button";

const page = async () => {
  return (
    <main className="flex justify-center">
    <div className="p-8">
      <div className="flex flex-col space-y-4">
          <form action={addItinerary}>
            <FormItinerary />
            <Button>追加</Button>
          </form>
        </div>
        <div>
          <ListItinerary />
        </div>
      </div>
    </main>
  );
};

export default page;
