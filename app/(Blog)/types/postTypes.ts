import type { Post, Category, PostImage } from "@prisma/client";

export type PostWithCategoryAndImage = Post & {
  category: Category;
  postImage?: PostImage | null;
};

export type PostWithPostImage = Post & {
  postImage?: PostImage | null;
};

export type PostWithCategory = Post & {
  category: Category;
};
