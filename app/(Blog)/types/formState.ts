export type CategoryFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    slug?: string[] | undefined;
    image?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

export type DashboardFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
  };
};

export type PostFormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    content?: string[] | undefined;
    slug?: string[] | undefined;
    description?: string[] | undefined;
    categoryId?: string[] | undefined;
    image?: string[] | undefined;
    altText?: string[] | undefined;
    draft?: string[] | undefined;
  };
};

export type ImageFormState = {
  message?: string | null;
  errors?: {
    image?: string[] | undefined;
    altText?: string[] | undefined;
  };
};
