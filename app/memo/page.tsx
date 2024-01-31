import ListMemo from "../components/memo/ListMemo";
import { addMemo } from "../action/action-memo";
import Button from "../components/Button";
import FormMemo from "../components/memo/FormMemo";

const Memo = async () => {
  return (
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <form action={addMemo}>
              <FormMemo />
              <Button  className="btn blue">追加</Button>
            </form>
          </div>
          <div>
            <ListMemo />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Memo;
