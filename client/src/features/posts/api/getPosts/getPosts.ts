import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IError } from '../../../../types/IShared';
import { IPost } from './IGetPosts';

/**
 * Query to get all posts
 */
export const usePosts = () => {
  return useQuery<AxiosResponse<IPost[]>, AxiosError<IError>>(
    ['posts'],
    async () =>
      axios.get<IPost[]>(`${import.meta.env.VITE_API_BASE}/post/feed`),
  );
};
