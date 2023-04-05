export interface IUseLoginRequest {
  /** Username of user to be signed up */
  username: string;

  /** Password of the user to be registered */
  password: string;
}

export interface IUseLoginResponse {
  /** Id of the user that logged in */
  id: number;

  /** Email of the user that logged in */
  email: string;

  /** Name of the user that logged in */
  name: string;

  /** Username of the user that logged in */
  username: string;
}
