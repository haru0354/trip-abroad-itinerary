import Link from "next/link";

import { getTrips } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import Button from "@/app/components/ui/button/Button";

type ListShareProps = {
  userId?: number | undefined;
};

const ListShare: React.FC<ListShareProps> = async ({ userId }) => {
  const trips = await getTrips();

  return (
    <>
      <h2 className="bg-itinerary-heading">旅程表の共有</h2>
      <p>編集より簡単に共有設定が変更可能です。</p>
      <p>
        共有設定が有効になっていると共有ページが公開されます。また、下記メニューに「共有ページボタン」が表示されます。
      </p>
      <p>
        ボタンをクリックした先のページをLineやfacebookで共有することで、作成した旅程表をあなた以外の人でも見れるようになります。
      </p>
      {trips?.map((trip) => {
        return (
          <div key={trip.id} className="border border-itinerary-borderBlack mb-6">
            <div className="flex justify-between flex-col sm:flex-row border-b border-dashed border-itinerary-borderBlack w-full p-4">
              <div className="flex justify-center items-center pt-2 ">
                <p className="mb-0">
                  {trip.name && trip.name.length > 72
                    ? `${trip.name.slice(0, 72)}...`
                    : trip.name}
                </p>
              </div>
              <div className="flex justify-center items-center pt-2 sm:border-l min-w-[180px] ">
                <p className="mb-0">
                  {trip.share ? "旅程表：共有" : "旅程表：共有しない"}
                </p>
              </div>
            </div>
            <div className="flex justify-center py-2 items-center">
              {trip.share && (
                <Link href={`/memorybook/share/${userId}/${trip.id}`}>
                  <Button color="blue" size="small">
                    共有ページ
                  </Button>
                </Link>
              )}
              {trip.blog && (
                <Link href={`travelogue/${userId}/${trip.id}`}>
                  <Button color="blue" size="small">
                    ブログ
                  </Button>
                </Link>
              )}
              <Link href={`/memorybook/dashboard/${trip.id}`}>
                <Button color="gray" size="small">
                  編集
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListShare;
