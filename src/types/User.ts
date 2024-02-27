export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = LoginInputs & {
  name: string;
  avatar: string;
};

export type UserType = RegisterInputs & {
  id: number;
  role: 'admin' | 'customer';
};

export type UserInitialState = {
  users: UserType[];
  loading: boolean;
  error?: string | null;
};
