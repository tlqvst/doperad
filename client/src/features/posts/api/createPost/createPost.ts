import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IError } from '../../../../types/IShared';
import { ICreatePostRequest, ICreatePostResponse } from './ICreatePost';

/**
 * Mutation to create a new post
 *
 * @param title - string, post title
 * @param content - string, post content
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<ICreatePostResponse>,
    AxiosError<IError>,
    ICreatePostRequest
  >(
    async ({ title, content }) => {
      return axios.post(`${import.meta.env.VITE_API_BASE}/post`, {
        title,
        content,
      });
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['posts']);
      },
      onError(error) {
        showNotification({
          message: `Failed to create post: ${error.response?.data.message}`,
          color: 'red',
        });
      },
    },
  );
};
