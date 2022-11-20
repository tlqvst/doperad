import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IUseLoginStatusResponse } from './IUseLoginStatus';

/**
 * Checks whether user is logged in or not and provides
 * basic user info
 * @returns IuseLoginStatusResponse
 */
const useLoginStatus = () => {
  return useQuery<AxiosResponse<IUseLoginStatusResponse>, AxiosError>(
    ['loginStatus'],
    async () =>
      axios.get<IUseLoginStatusResponse>(
        `${import.meta.env.VITE_API_BASE}/user/status`,
      ),
    {
      onError() {
        return null;
      },
      useErrorBoundary: false,
    },
  );
};

export default useLoginStatus;
