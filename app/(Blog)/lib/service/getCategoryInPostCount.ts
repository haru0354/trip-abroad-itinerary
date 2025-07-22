import prisma from "@/app/lib/prisma";

export async function getCategoryInPostCount(categoryId: string) {
  try {
    const countData = await prisma.category.findUnique({
      where: { id: categoryId },
      select: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return countData?._count.posts;
  } catch (error) {
    console.error("投稿件数の取得に失敗しました:", error);
    throw new Error("投稿件数の取得に失敗しました");
  }
}
