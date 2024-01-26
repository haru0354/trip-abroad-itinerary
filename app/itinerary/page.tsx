import ItineraryList from "../components/itinerary/ItineraryList";
import Form from "../components/Form";
import Textarea from "../components/Textarea";
import Date from "../components/Date";
import Time from "../components/Time";
import Button from "../components/Button";
import { addItinerary } from "../action/action-itinerary";

const page = () => {
  return (
    <main>
      <div>
        <form action={addItinerary}>
        <Date />
        <Time />
        <Form label={"目的"} placeholder={"飛行機・食事・観光など"} name={"name"}  />
        <Textarea label={"補足情報"} placeholder={"観光地なら服装の注意。料理ならおすすめの料理などメモを記載しましょう。"} name={"content"}  />
        <Textarea label={"補足情報2"} placeholder={"ここに記載したのは最初は非常時でボタンをクリックで表示されます。旅程表とは関係のない観光地の情報や乗り換え方法など記載しましょう。"} name={"hideContent"}  />
        <Button>
          追加
        </Button>
        </form>
      </div>
      <ItineraryList />

    </main>
  )
}

export default page;