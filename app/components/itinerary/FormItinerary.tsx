import Form from "../Form";
import Textarea from "../Textarea";
import Date from "../Date";
import Time from "../Time";
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

type FormItineraryProps = {
  itinerary?: Itinerary | null;
  buttonName: string;
  formAction: (data: FormData) => Promise<void> | Promise<never> | null;
};

const FormItinerary: React.FC<FormItineraryProps> = ({
  itinerary,
  buttonName,
  formAction
}) => {
  return (
    <div>
      <form action={formAction}>
        <Date defaultValue={itinerary?.date} />
        <Time defaultValue={itinerary?.time} />
        <Form
          label={"目的"}
          placeholder={"飛行機・食事・観光など"}
          name={"name"}
          defaultValue={itinerary?.name}
        />
        <Textarea
          label={"補足情報"}
          placeholder={
            "観光地なら服装の注意。料理ならおすすめの料理などメモを記載しましょう。"
          }
          name={"content"}
          defaultValue={itinerary?.content}
        />
        <Textarea
          label={"補足情報2"}
          placeholder={
            "ここに記載したのは最初は非常時でボタンをクリックで表示されます。旅程表とは関係のない観光地の情報や乗り換え方法など記載しましょう。"
          }
          name={"hideContent"}
          defaultValue={itinerary?.hideContent}
        />
        <Button className="btn blue">{buttonName}</Button>
      </form>
    </div>
  );
};

export default FormItinerary;
