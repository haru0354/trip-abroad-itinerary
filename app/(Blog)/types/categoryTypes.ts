import type { Category, Post, PostImage } from "@prisma/client";

export type CategoryWithPostAndImage = Category & {
  post: Post;
  postImage: PostImage;
};

export type CategoryWithPostImage = Category & {
  postImage: PostImage;
};

export type CategoryWithPost = Category & {
  post: Post;
};
