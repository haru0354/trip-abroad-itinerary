import prisma from "@/app/lib/prisma";

export async function getPosts(includeOptions?: string, take?: number) {
  try {
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
        createdDate: "asc" | "desc";
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
        createdDate: "desc",
      };
    }

    const posts = await prisma.post.findMany(queryOptions);

    return posts;
  } catch (error) {
    console.error("DBから記事一覧の取得に失敗しました。", error);
    throw new Error("DBから記事一覧の取得に失敗しました。");
  }
}

export async function getCategories(includeOptions?: string) {
  try {
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
  } catch (error) {
    console.error("DBからカテゴリ一覧の取得に失敗しました。", error);
    throw new Error("DBからカテゴリ一覧の取得に失敗しました。");
  }
}

export async function getPostImages() {
  try {
    const images = await prisma.postImage.findMany();
    return images;
  } catch (error) {
    console.error("DBから画像一覧の取得に失敗しました。", error);
    throw new Error("DBから画像一覧の取得に失敗しました。");
  }
}

export async function getDashboardMemos() {
  try {
    const dashboardMemos = await prisma.dashboardMemo.findMany();
    return dashboardMemos;
  } catch (error) {
    console.error(
      "DBからダッシュボードのメモの一覧の取得に失敗しました。",
      error
    );
    throw new Error("DBからダッシュボードのメモの一覧の取得に失敗しました。");
  }
}
