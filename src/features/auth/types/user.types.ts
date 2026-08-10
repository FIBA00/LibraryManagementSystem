// types/user.types.ts
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
  accessToken: string;
};

export type SignupRequest = {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type SignupResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    phone: string;
  };
};