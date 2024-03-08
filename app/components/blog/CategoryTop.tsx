import Link from "next/link";
import prisma from "../lib/prisma";
import Image from "next/image";

const CategoryTop = async () => {
  const categories = await prisma.category.findMany({
    include: {
      postImage: true,
    },
  });

  return (
    <>
      <h3 className="bg-sky-600 text-white font-bold text-lg px-2 py-4 rounded-sm">
        カテゴリ
      </h3>
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
        {categories.map((category) => {
          return (
            <>
              <div key={category.id} className="flex flex-col items-center">
                <Link href={`/${category.slug}`}>
                  <div className=" rounded mx-5 my-6 flex flex-col items-center  max-w-[330px] min-w-[330px]">
                    <div className="min-h-[220px] max-h-[220px] justify-centers">
                      {category.postImage ? (
                        <Image
                          src={category.postImage.url}
                          alt={category.postImage.altText}
                          width={330}
                          height={220}
                        />
                      ) : (
                        <Image
                          src="/008.jpg"
                          alt="aa"
                          width={330}
                          height={220}
                        />
                      )}
                    </div>
                    <div className="px-3 py-1 min-h-[180px]">
                      <h3 className="text-gray-700 my-6 text-center text-xl font-semibold">
                        {category.name && category.name.length > 12 ? (
                          <>{category.name.slice(0, 12)}...</>
                        ) : (
                          <>{category.name}</>
                        )}
                      </h3>
                      <p className="text-gray-600 my-2">
                        {category.description &&
                        category.description.length > 60 ? (
                          <>{category.description.slice(0, 60)}...</>
                        ) : (
                          <>{category.description}</>
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoryTop;
