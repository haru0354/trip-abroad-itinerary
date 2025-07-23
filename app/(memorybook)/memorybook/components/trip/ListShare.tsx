import { getTrips } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import ButtonNextLink from "@/app/components/ui/button/ButtonNextLink";

const ListShare = async () => {
  const trips = await getTrips();

  return (
    <>
      <h2 className="bg-itinerary-heading">旅程表の共有</h2>
      <p>
        共有設定が有効だと共有ページが公開され、作成した旅程表が誰でも閲覧が可能になります。
      </p>
      <p>旅行の同行者や、SNSで、旅程表を共有したい場合に利用しましょう。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips?.map((trip) => {
          return (
            <div
              key={trip.id}
              className="mb-6 border rounded shadow-lg border-itinerary-borderBlack bg-white"
            >
              <div className="flex justify-between flex-col sm:flex-row border-b border-dashed border-itinerary-borderBlack w-full p-4">
                <div className="flex justify-center items-center pt-2 ">
                  <p className="mb-0">
                    {trip.name && trip.name.length > 72
                      ? `${trip.name.slice(0, 72)}...`
                      : trip.name}
                  </p>
                </div>
                <div className="flex justify-center items-center pt-2 sm:pl-4 sm:border-l">
                  <p className="mb-0">
                    {trip.share ? "🌍 旅程表：共有" : "🔒 旅程表：共有しない"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 py-4 bg-white">
                {trip.share && (
                  <ButtonNextLink
                    href={`/memorybook/share/${trip.id}`}
                    size="small"
                    className="rounded"
                  >
                    共有ページ
                  </ButtonNextLink>
                )}
                {trip.blog && (
                  <ButtonNextLink
                    href={`travelogue/${trip.userId}/${trip.id}`}
                    size="small"
                    className="rounded"
                  >
                    ブログ
                  </ButtonNextLink>
                )}
                <ButtonNextLink
                  href={`/memorybook/dashboard/${trip.id}`}
                  size="small"
                  color="gray"
                  className="rounded"
                >
                  編集
                </ButtonNextLink>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListShare;
