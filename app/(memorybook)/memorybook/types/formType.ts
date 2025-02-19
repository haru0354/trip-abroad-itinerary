export type UserFormType = {
  name: string;
  email: string;
  password: string;
};

export type DeleteUserFormType = {
  password: string;
  passwordConfirmation: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type passwordFormType = {
  password: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type ProfileFormType = {
  name: string;
  email: string;
};

export type ChangeEmailFormType = {
  email: string;
  emailConfirmation: string;
  password: string;
};

export type TripFormType = {
  startDate?: string;
  endDate?: string;
  name: string;
  destination?: string;
};

export type ItineraryFormType = {
  date: string;
  time: string;
  name: string;
  content?: string;
  hideContent?: string;
  image?: File;
  altText?: string;
  tripId: string;
};

export type MemoFormType = {
  name: string;
  content?: string;
  tripId: string;
};
