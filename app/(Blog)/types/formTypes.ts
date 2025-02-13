export type LoginFormType = {
  id: string;
  password: string;
};

export type DashboardMemoFormType = {
  name: string;
  content: string;
};

export type PostFormType = {
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  title: string;
  content: string;
  draft: boolean;
  image?: File;
  altText?: string;
};

export type CategoryFormType = {
  name: string;
  slug: string;
  description: string;
  title: string;
  content: string;
  image?: File;
  altText?: string;
};

export type PostImageFormType = {
  image: File;
  altText: string;
};
