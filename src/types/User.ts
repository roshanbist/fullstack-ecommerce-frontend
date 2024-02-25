export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = LoginInputs & {
  name: string;
  avatar: string;
};
