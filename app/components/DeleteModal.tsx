import Button from './Button'

interface Memo {
  id: number;
  name: string;
  content: string;
  isCompleted: boolean;
}

interface DeleteModalProps {
  memo: Memo | null; // Memo型またはnullを許容する
  deleteTodoWithId: (id: number) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ memo, deleteTodoWithId }) => {

  if (memo === null) {
    return <div>削除対象のメモが存在しません。</div>;
  }

  return (
    <div>
      <div>
        <h3>
          <span>を削除しますか</span>{memo.id}
        </h3>
        <div>
          <Button
          >
            キャンセル
          </Button>
        <form action="deleteTodoWithId">
        <input type="hidden" name="id" value={memo.id} />
        <Button>
        削除
        </Button>
        </form>
          {memo.id}

        </div>
      </div>
    </div>
  )
}

export default DeleteModal