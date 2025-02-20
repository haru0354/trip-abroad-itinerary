type ListProfileProps = {
  userName: string | undefined;
  userEmail: string | undefined;
};

const ListProfile: React.FC<ListProfileProps> = async ({
  userName,
  userEmail,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full border py-4 px-6  border-itinerary-borderGray rounded bg-white max-w-[620px]">
        <p className="text-center border-b pb-4 border-itinerary-borderGray font-semibold">
          プロフィール
        </p>
        <p className="font-bold mb-1 mt-6">名前(ニックネーム)</p>
        <p className="my-4">{userName}</p>
        <p className="font-bold mb-1 mt-6">メールアドレス</p>
        <p className="my-4">{userEmail}</p>
      </div>
    </div>
  );
};

export default ListProfile;
