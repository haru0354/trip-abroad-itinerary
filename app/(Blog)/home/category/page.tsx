import prisma from "@/app/components/lib/prisma";

const page = async () => {
  const posts = await prisma.post.findMany();

  const onceCategories = new Set(posts.map(post => post.category));
  const onceCategoriesArray = Array.from(onceCategories);

  return (
    <>
      <h2>カテゴリを追加する</h2>
        



      <h2>カテゴリの一覧</h2>
      {onceCategoriesArray.map((category) => {
        return (
          <div key={category}>
            <p>{category}</p>
          </div>
        );
      })}
    </>
  );
};

export default page;
