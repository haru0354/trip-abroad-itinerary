import prisma from "@/app/components/lib/prisma";

export async function getPost(postSlug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug: postSlug,
    },
    include: {
      postImage: true,
      category: true,
    },
  });

  return post;
}

export async function getCategory(categorySlug: string) {
  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      posts: true,
      postImage: true,
    },
  });

  return category;
}

export async function getPostImage(postImageId: string) {
  const id = Number(postImageId);
  const postImage = await prisma.postImage.findUnique({
    where: {
      id,
    },
  });
  return postImage;
}

export async function getDashboardMemo(dashboardMemoId: string) {
  const id = Number(dashboardMemoId);

  const dashboardMemo = await prisma.dashboardMemo.findUnique({
    where: {
      id,
    },
  });
  return dashboardMemo;
}
