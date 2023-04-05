export interface ICreatePostRequest {
  /** Title of the post */
  title: string;

  /** Content of the post */
  content: string;
}

export interface ICreatePostResponse {
  /** Id of the post that was created */
  id: number;

  /** Title of the post that was created */
  title: string;

  /** Content of the post that was created */
  content: string;

  /** Whether the post is published or not */
  published: boolean;

  /** Id of the author of the post */
  authorId: number;
}
