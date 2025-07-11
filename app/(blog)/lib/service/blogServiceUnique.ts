import prisma from "@/app/lib/prisma";

export async function getPost(
  whereOptions?: string,
  whereValue?: string,
  includeOptions?: string
) {
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

    let whereSelect: { id: string } | { slug: string };

    if (whereOptions === "id") {
      whereSelect = {
        id: whereValue as string,
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
  } catch (error) {
    console.error("DBから記事の取得に失敗しました。", error);
    throw new Error("DBから記事の取得に失敗しました。");
  }
}

export async function getCategory(
  whereOptions?: string,
  whereValue?: string,
  includeOptions?: string
) {
  try {
    const include: {
      posts?:
        | {
            include: {
              postImage: boolean;
            };
          }
        | boolean;
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

    let whereSelect: { id: string } | { slug: string };

    if (whereOptions === "id") {
      whereSelect = {
        id: whereValue as string,
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
  } catch (error) {
    console.error("DBからカテゴリの取得に失敗しました。", error);
    throw new Error("DBからカテゴリの取得に失敗しました。");
  }
}

export async function getPostImage(postImageId: string) {
  try {
    const postImage = await prisma.postImage.findUnique({
      where: {
        id: postImageId,
      },
    });

    return postImage;
  } catch (error) {
    console.error("DBから画像の取得に失敗しました。", error);
    throw new Error("DBから画像の取得に失敗しました。");
  }
}

export async function getDashboardMemo(dashboardMemoId: string) {
  try {
    const dashboardMemo = await prisma.dashboardMemo.findUnique({
      where: {
        id: dashboardMemoId,
      },
    });
    
    return dashboardMemo;
  } catch (error) {
    console.error(
      "DBから個別のダッシュボードのメモの取得に失敗しました。",
      error
    );
    throw new Error("DBから個別のダッシュボードのメモの取得に失敗しました。");
  }
}
