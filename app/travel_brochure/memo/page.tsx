import ListMemo from "../../components/memo/ListMemo";
import { addMemo } from "../../action/action-memo";
import FormMemo from "../../components/memo/FormMemo";
import getCurrentUser from "@/app/action/getCurrentUser";

const Memo = async () => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id

  return (
    <main>
      <div className="main-contents-area">
        <div className="contents-area">
          <div>
            <FormMemo formAction={addMemo} buttonName="追加" userId={userId}/>
          </div>
          <div>
            <ListMemo userId={userId}/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Memo;
