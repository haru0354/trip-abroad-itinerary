import prisma from "@/app/lib/prisma";

export async function getPosts(includeOptions?: string, take?: number,) {
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

  const queryOptions: {
    include: typeof include;
    where?: {
      draft: boolean;
    };
    take?: number;
    orderBy?: {
      createdDate: 'asc' | 'desc';
    };
  } = {
    include: include,
  };
  
  if (take) {
    queryOptions.where = {
      draft: true,
    };
    queryOptions.take = take;
    queryOptions.orderBy = {
      createdDate: 'desc',
    };
  }

  const posts = await prisma.post.findMany(queryOptions);

  return posts;
}

export async function getCategories(includeOptions?: string) {
  const include: {
    posts?: boolean;
    postImage?: boolean;
  } = { posts: false, postImage: false };

  switch (includeOptions) {
    case "posts":
      include.posts = true;
      break;
    case "postImage":
      include.postImage = true;
      break;
    case "postsAndPostImage":
      include.posts = true;
      include.postImage = true;
      break;
    default:
      break;
  }

  const categories = await prisma.category.findMany({
    include: include,
  });

  return categories;
}

export async function getPostImages() {
  const images = await prisma.postImage.findMany();
  return images;
}

export async function getDashboardMemos() {
  const dashboardMemos = await prisma.dashboardMemo.findMany();
  return dashboardMemos;
}
