import type { Category, Post, PostImage } from "@prisma/client";

export type CategoryWithPostsAndImage = Category & {
  posts: Post[];
  postImage?: PostImage | null;
};

export type CategoryWithPostImage = Category & {
  postImage?: PostImage | null;
};

export type CategoryWithPosts = Category & {
  posts: Post[];
};
