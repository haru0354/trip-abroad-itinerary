import type { Category, Post, PostImage } from "@prisma/client";

export type CategoryWithPostsAndImage = Category & {
  posts: Post[];
  postImage: PostImage;
};

export type CategoryWithPostImage = Category & {
  postImage: PostImage;
};

export type CategoryWithPosts = Category & {
  posts: Post[];
};
