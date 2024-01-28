import { deleteItinerary } from "@/app/action/action-itinerary";
import Button from "../Button";

type Itinerary = {
  id: number;
  date: string;
  time: string;
  name: string;
  content: string;
  hideContent: string;
  isShowContent: boolean;
};

type DeleteModalProps = {
  itinerary?: Itinerary | null ;
};

const DeleteItineraryModal: React.FC<DeleteModalProps> = ({ itinerary }) => {
  if (!itinerary) {
    return <p>削除対象の旅程がありません。</p>;
  }

  const deleteItineraryWithId = deleteItinerary.bind(null, itinerary.id);

  return (
    <div>
      <div>
        <h3>
          <p>[{itinerary.name}]を削除しますか</p>
        </h3>
        <div>
          <Button>キャンセル</Button>
          <form>
            <Button formAction={deleteItineraryWithId}>削除</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteItineraryModal;
