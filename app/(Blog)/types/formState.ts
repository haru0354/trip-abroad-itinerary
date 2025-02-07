export type DashboardFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
  };
};