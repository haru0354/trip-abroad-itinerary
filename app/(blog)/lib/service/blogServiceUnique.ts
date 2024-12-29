import prisma from "@/app/components/lib/prisma";

export async function getPost(
  whereOptions?: string,
  whereValue?: string,
  includeOptions?: string
) {
  const include: {
    category?: boolean;
    postImage?: boolean;
  } = { category: false, postImage: false };

  switch (includeOptions) {
    case "category":
      include.category = true;
      break;
    case "postImage":
      include.postImage = true;
      break;
    case "categoryAndPostImage":
      include.category = true;
      include.postImage = true;
      break;
    default:
      break;
  }

  let whereSelect: { id: number } | { slug: string };

  if (whereOptions === "id") {
    whereSelect = {
      id: Number(whereValue),
    };
  } else if (whereOptions === "slug") {
    whereSelect = {
      slug: whereValue as string,
    };
  } else {
    throw new Error("whereOptionsが正しくありません");
  }

  const post = await prisma.post.findUnique({
    where: whereSelect,
    include: include,
  });

  return post;
}

export async function getCategory(
  whereOptions?: string,
  whereValue?: string,
  includeOptions?: string
) {
  const include: {
    posts?: {
      include: {
        postImage: boolean;
      };
    } | boolean;
    postImage?: boolean;
  } = {};

  switch (includeOptions) {
    case "posts":
      include.posts = true;
      break;
    case "postImage":
      include.postImage = true;
      break;
    case "postsAndPostImage":
      include.posts = {
        include: {
          postImage: true,
        },
      };
      include.postImage = true;
      break;
    default:
      break;
  }

  let whereSelect: { id: number } | { slug: string };

  if (whereOptions === "id") {
    whereSelect = {
      id: Number(whereValue),
    };
  } else if (whereOptions === "slug") {
    whereSelect = {
      slug: whereValue as string,
    };
  } else {
    throw new Error("whereOptionsが正しくありません");
  }

  const category = await prisma.category.findUnique({
    where: whereSelect,
    include: include,
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
