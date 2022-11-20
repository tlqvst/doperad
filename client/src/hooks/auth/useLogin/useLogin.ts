import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IError } from '../../../types/IShared';
import { IUseLoginRequest, IUseLoginResponse } from './IUseLogin';

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<IUseLoginResponse>,
    AxiosError<IError>,
    IUseLoginRequest
  >(
    async ({ username, password }) => {
      return axios.post(`${import.meta.env.VITE_API_BASE}/auth/login`, {
        username,
        password,
      });
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['loginStatus']);
      },
    },
  );
};

export default useLogin;
