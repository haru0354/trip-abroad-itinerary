export type UserFormType = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type TripFormType = {
  startDate?: string;
  endDate?: string;
  name: string;
  destination?: string;
};
