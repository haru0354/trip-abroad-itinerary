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

export type MemoFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    content?: string[] | undefined;
    userId?: string[] | undefined;
  };
};

export type ItineraryFormState = {
  message?: string | null;
  errors?: {
    date?: string[] | undefined;
    time?: string[] | undefined;
    name?: string[] | undefined;
    content?: string[] | undefined;
    hideContent?: string[] | undefined;
    image?: string[] | undefined;
    altText?: string[] | undefined;
  };
};

export type ProfileFormState = {
  message?: string | null;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
  };
};

export type PasswordFormState = {
  message?: string | null;
  errors?: {
    password?: string[] | undefined;
    passwordConfirmation?: string[] | undefined;
  };
};
