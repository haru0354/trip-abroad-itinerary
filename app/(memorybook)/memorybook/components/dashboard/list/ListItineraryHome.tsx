import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { getItineraryHomes } from "@/app/(memorybook)/memorybook/lib/memoryBookService";
import ButtonImage from "@/app/components/ui/ButtonImage";

type ListItineraryHomeProps = {
  userId?: number | undefined;
};

const ListItineraryHome: React.FC<ListItineraryHomeProps> = async ({
  userId,
}) => {
  const itineraryHomes = await getItineraryHomes(userId);

  const sortedItineraryHomes = itineraryHomes.sort((a, b) => {
    if (a.startDate === null && b.startDate === null) {
      return 0;
    }
    if (a.startDate === null) {
      return 1;
    }
    if (b.startDate === null) {
      return -1;
    }
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  if (sortedItineraryHomes && sortedItineraryHomes.length === 0) {
    return (
      <>
        <h2 className="bg-itinerary-heading">アプリの使い方</h2>
        <div className="border border-dashed border-gray-600 my-4 p-4 text-center">
          まずは1つ目の旅行プランを作成しましょう。下記のフォームより作成ができます。
        </div>
        <p className="pt-6 text-center">サンプル</p>
        <div className="w-full bg-white rounded">
          <div className="flex w-full my-2 flex-wrap items-center justify-center">
            <div className="flex flex-col items-center max-w-[350px]">
              <div className=" border-2 border-sky-600 rounded mx-5 my-6 px-8 py-10 flex flex-col min-w-[330px]">
                <span className="text-blue-500  flex justify-center mb-6">
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    style={{ fontSize: "2em" }}
                  />
                </span>
                <h3 className="mb-6 text-center text-xl font-semibold">
                  タイトル：初海外旅行 in シンガポール
                </h3>
                出発日:03月08日 帰宅日:03月11日 旅行先：シンガポール
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="bg-itinerary-heading">旅行のしおり一覧</h2>
      <div className="w-full bg-white rounded">
        <div className="flex my-10 mx-4 flex-wrap items-center justify-center">
          {sortedItineraryHomes.map((itineraryHome) => {
            return (
              <div
                key={itineraryHome.id}
                className="flex flex-col items-center mx-4 max-w-[370px] "
              >
                <div className="ml-auto">
                  <Link href={`/memorybook/${itineraryHome.id}`}>
                    <ButtonImage
                      className="rounded py-1"
                      size="small"
                      icon="pen"
                      iconClassName="mr-2"
                    >
                      編集
                    </ButtonImage>
                  </Link>
                </div>
                <Link href={`/memorybook/${itineraryHome.id}/itinerary`}>
                  <div className="border-2 w-full border-sky-600 rounded mb-10 px-8 pt-6 flex flex-col min-w-[340px] min-h-[300px] hover:bg-sky-200">
                    <span className="text-blue-500  flex justify-center mb-6">
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        style={{ fontSize: "2em" }}
                      />
                    </span>
                    <div className="flex items-center justify-center min-h-[110px] ">
                      <h3 className="mb-6 text-center text-xl font-semibold">
                        {itineraryHome.name}
                      </h3>
                    </div>
                    <ul>
                      <li>出発日：{itineraryHome.startDate}</li>
                      <li>帰宅日：{itineraryHome.endDate}</li>
                      <li>旅行先：{itineraryHome.destination}</li>
                    </ul>
                    <p className=" min-w-[100px] px-6 py-1 mt-5 mx-auto shadow font-bold  text-white border rounded border-sky-900 bg-sky-700">
                      旅程表へ
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListItineraryHome;
