export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = LoginInputs & {
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  address: string;
};

export type UserType = RegisterInputs & {
  _id: string;
  role: 'admin' | 'customer';
};

export type UserInitialState = {
  loggedUser: UserType | null;
  users: UserType[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string | null;
  userRole?: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type loginUserAuth = {
  tokens: AuthToken;
  user: UserType;
};

export type EditProfileType = {
  firstname: string;
  lastname: string;
  email: string;
};

export type PasswordUpdate = {
  oldPassword: string;
  newPassword: string;
};
