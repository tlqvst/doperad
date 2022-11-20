import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IError } from '../../../types/IShared';

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<null>, AxiosError<IError>>(
    async () => {
      return axios.post(`${import.meta.env.VITE_API_BASE}/auth/logout`);
    },
    {
      onSuccess() {
        queryClient.resetQueries(['loginStatus']);
      },
    },
  );
};

export default useLogout;
