import prisma from "../lib/prisma";
import Button from "../ui/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

type ListItineraryHomeProps = {
  userId?: number | undefined;
};

const ListItineraryHome: React.FC<ListItineraryHomeProps> = async ({
  userId,
}) => {
  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      userId,
    },
  });

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
        <h2>アプリの使い方</h2>
        <div className="border border-dashed border-gray-600 my-4 p-4 text-center text-gray-700">
          まずは1つ目の旅行プランを作成しましょう。下記のフォームより作成ができます。
        </div>
        <p className="pt-6 text-gray-700 text-center">サンプル</p>
        <div className="w-full bg-white rounded">
          <div className="flex w-full my-2 flex-wrap items-center justify-center">
            <div className="flex flex-col items-center max-w-[350px]">
              <div className="border-2 border-sky-600 rounded mx-5 my-6 px-8 py-10 flex flex-col min-w-[330px]">
                <span className="text-blue-500  flex justify-center mb-6">
                  <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    style={{ fontSize: "2em" }}
                  />
                </span>
                <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold ">
                  タイトル：初海外旅行 in シンガポール
                </h3>
                出発日:03月08日
                帰宅日:03月11日
                旅行先：シンガポール
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>旅行の一覧</h2>
      <div className="w-full bg-white rounded">
        <div className="flex w-full my-10 flex-wrap items-center justify-center">
          {sortedItineraryHomes.map((itineraryHome) => {
            return (
              <div
                key={itineraryHome.id}
                className="flex flex-col items-center max-w-[370px] "
              >
                <Link href={`/memorybook/${itineraryHome.id}/itinerary`}>
                  <div className="border-2 border-sky-600 rounded mx-5 my-6 px-8 py-6 flex flex-col min-w-[340px] min-h-[300px] hover:bg-sky-200">
                    <span className="text-blue-500  flex justify-center mb-6">
                      <FontAwesomeIcon
                        icon={faPlaneDeparture}
                        style={{ fontSize: "2em" }}
                      />
                    </span>
                    <div className="flex items-center justify-center min-h-[110px] ">
                      <h3 className="text-gray-700 mb-6 text-center text-xl font-semibold">
                        {itineraryHome.name}
                      </h3>
                    </div>
                    <ul>
                      <li>出発日：{itineraryHome.startDate}</li>
                      <li>帰宅日：{itineraryHome.endDate}</li>
                      <li>旅行先：{itineraryHome.destination}</li>
                    </ul>
                  </div>
                </Link>
                <Link href={`/memorybook/${itineraryHome.id}`}>
                  <Button color="blue" size="normal">
                    編集
                  </Button>
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
