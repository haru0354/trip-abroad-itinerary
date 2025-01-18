import Link from "next/link";
import Button from "@/app/components/ui/Button";

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
      <h2 className="bg-itinerary-heading">プロフィール</h2>
      <div className="flex items-center justify-center">
        <div className="w-full border py-4 px-6  border-gray-300 rounded bg-white max-w-[620px]">
          <p className="text-center border-b pb-4 border-gray-300 font-semibold">
            プロフィール
          </p>
          <p className="block  text-sm font-bold mb-1 mt-7">
            名前(ニックネーム)
          </p>
          <p className="my-4">{userName}</p>
          <p className="block text-sm font-bold mb-1 mt-6">
            メールアドレス
          </p>
          <p className="my-4">{userEmail}</p>
          <Link href={`/memorybook/dashboard/profile/${userId}`}>
            <Button color="blue" size="normal" className="rounded mt-4">
              変更・削除
            </Button>
          </Link>
        </div>
      </div>
      <p className="mt-8">
        プロフィール変更・パスワードの変更・アカウントの削除は上記ボタンをクリックしてください。
      </p>
    </>
  );
};

export default ListProfile;
