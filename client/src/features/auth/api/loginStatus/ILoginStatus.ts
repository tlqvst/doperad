export interface IUseLoginStatusResponse {
  /** Whether the user is logged in or not */
  isLoggedIn: true;

  /** The username of the logged in user */
  username: string;

  /** The ID of the logged in user */
  userId: number;
}
