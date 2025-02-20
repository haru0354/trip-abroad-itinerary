import type { Post, Category, PostImage } from "@prisma/client";

export type PostWithCategoryAndImage = Post & {
  category: Category;
  postImage: PostImage;
};

export type PostWithPostImage = Post & {
  postImage: PostImage;
};

export type PostWithCategory = Post & {
  category: Category;
};
