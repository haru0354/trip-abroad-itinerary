import Button from "../ui/Button";
import Link from "next/link";

type ListProfileProps = {
  userId: number | undefined;
  userName: string | undefined;
  userEmail: string | undefined;
};

const ListProfile: React.FC<ListProfileProps> = async ({
  userName,
  userEmail,
  userId,
}) => {
  return (
    <>
      <h2>プロフィール</h2>

      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 text-gray-600 font-bold">
            プロフィール
          </p>
          <p className=" block text-gray-600 text-sm font-bold mb-1 mt-7">
            名前(ニックネーム)
          </p>
          <p className=" text-gray-700 my-4">{userName}</p>
          <p className=" block text-gray-600 text-sm font-bold mb-1 mt-6">
            メールアドレス
          </p>
          <p className=" text-gray-700 my-4">{userEmail}</p>
          <Link href={`/memorybook/home/profile/${userId}`}>
            <Button color="blue" size="normal" className="rounded mt-4">
              変更する
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ListProfile;
