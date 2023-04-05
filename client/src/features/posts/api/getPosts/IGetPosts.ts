export interface IPost {
  /** Id of the post */
  id: number;

  /** Title of the post */
  title: string;

  /** Content of the post */
  content: string;

  /** Whether the post is published */
  published: boolean;

  /** Id of the author of the post */
  authorId: number;

  /** Author object */
  author: {
    /** Username of the author */
    username: string;
  };
}
