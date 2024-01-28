import { deleteMemo } from "../../action/action-memo";
import Button from "../Button";

type Memo = {
  id: number;
  name: string;
  content: string;
  isCompleted: boolean;
};

type DeleteModalProps = {
  memo?: Memo | null;
};

const DeleteMemoModal: React.FC<DeleteModalProps> = ({ memo }) => {
  if (!memo) {
    return <p>削除対象のメモがありません。</p>;
  }

  const deleteMemoWithId = deleteMemo.bind(null, memo.id);

  return (
    <div>
      <div>
        <h3>{memo && <p>[{memo.name}]を削除しますか</p>}</h3>
        <div>
          <Button>キャンセル</Button>
          <form>
            <Button formAction={deleteMemoWithId}>削除</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemoModal;
