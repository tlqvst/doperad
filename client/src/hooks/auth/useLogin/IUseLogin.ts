export interface IUseLoginRequest {
  username: string;
  password: string;
}

export interface IUseLoginResponse {
  id: number;
  email: string;
  name: string;
  username: string;
}
