export type MemoFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

export type TripFormState = {
  message?: string | null;
  errors?: {
    startDate?: string[] | undefined;
    endDate?: string[] | undefined;
    name?: string[] | undefined;
    destination?: string[] | undefined;
  };
  createdTripId?: number | null;
};

export type ProfileFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
  };
};
