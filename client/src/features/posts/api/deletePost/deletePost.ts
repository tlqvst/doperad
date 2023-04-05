import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IError } from '../../../../types/IShared';
import { showNotification } from '@mantine/notifications';

/**
 * Mutation to delete a post
 *
 * @param id - number, the post to delete
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<null>, AxiosError<IError>, number>(
    async (id) => {
      return axios.delete(`${import.meta.env.VITE_API_BASE}/post/${id}`);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['posts']);
      },
      onError(error) {
        showNotification({
          message: `Failed to delete post: ${error.response?.data.message}`,
          color: 'red',
        });
      },
    },
  );
};
