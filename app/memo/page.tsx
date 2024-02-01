import ListMemo from "../components/memo/ListMemo";
import { addMemo } from "../action/action-memo";
import FormMemo from "../components/memo/FormMemo";

const Memo = async () => {
  return (
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <ListMemo />
          </div>
          <div>
            <FormMemo formAction={addMemo} buttonName="追加" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Memo;
