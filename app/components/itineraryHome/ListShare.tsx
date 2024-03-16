import Link from "next/link";
import prisma from "../lib/prisma";
import Button from "../ui/Button";

type ListShareProps = {
  userId?: number | undefined;
};

const ListShare: React.FC<ListShareProps> = async ({ userId }) => {
  const itineraryHomes = await prisma.itineraryHome.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <h2>旅程表の共有</h2>
      {itineraryHomes.map((itineraryHome) => {
        return (
          <div key={itineraryHome.id} className="border border-gray-500 mb-6">
            <div className="flex justify-between flex-col sm:flex-row border-b border-dashed border-gray-500 w-full p-4">
              <div className="flex justify-center items-center pt-2 ">
                <p className="mb-0">
                  {itineraryHome.name && itineraryHome.name.length > 72
                    ? `${itineraryHome.name.slice(0, 72)}...`
                    : itineraryHome.name}
                </p>
              </div>
              <div className="flex justify-center items-center pt-2 sm:border-l min-w-[180px] ">
                <p className="mb-0">
                  {itineraryHome.share ? "旅程表：共有" : "旅程表：共有しない"}
                </p>
              </div>
            </div>
            <div className="flex justify-center py-2 items-center">
              {itineraryHome.share && (
                <Link href={`/share/${userId}/${itineraryHome.id}`}>
                  <Button color="blue" size="small">
                    旅程表
                  </Button>
                </Link>
              )}
              {itineraryHome.blog && (
                <Link href={`travelogue/${userId}/${itineraryHome.id}`}>
                  <Button color="blue" size="small">
                    ブログ
                  </Button>
                </Link>
              )}
              <Link href={`/memorybook/home/${itineraryHome.id}`}>
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
