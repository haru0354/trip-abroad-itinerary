import ListMemo from "../components/memo/ListMemo";
import { addMemo } from "../action/action-memo";
import Button from "../components/Button";
import FormMemo from "../components/memo/FormMemo";

const Memo = async () => {

  return (
    <main>
      <div>
        <form action={addMemo}>
          <FormMemo />
          <Button>追加</Button>
        </form>
      </div>
      <div>
        <ListMemo />
      </div>
    </main>
  );
};

export default Memo;
