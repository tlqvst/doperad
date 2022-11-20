import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IUseSignupRequest } from './IUseSignup';
import { IError } from '../../../types/IShared';

const useSignup = () => {
  return useMutation<
    AxiosResponse<null>,
    AxiosError<IError>,
    IUseSignupRequest
  >(async (parameters) => {
    return axios.post(`${import.meta.env.VITE_API_BASE}/user/signup`, {
      ...parameters,
    });
  });
};

export default useSignup;
