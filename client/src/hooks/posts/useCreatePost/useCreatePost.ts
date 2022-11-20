import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IError } from '../../../types/IShared';
import { ICreatePostRequest, ICreatePostResponse } from './IUseCreatePost';

const useCreatePost = () => {
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

export default useCreatePost;
