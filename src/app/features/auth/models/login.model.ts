export interface LoginPayload {
  email: string | null;
  password: string | null;
}

export interface User{
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
}
