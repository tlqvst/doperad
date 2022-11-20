export interface ICreatePostRequest {
  title: string;
  content: string;
}

export interface ICreatePostResponse {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}
