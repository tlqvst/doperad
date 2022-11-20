import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IUseSignupRequest } from '../../../hooks/auth/useSignup/IUseSignup';

export interface ISignup {
  onSignup: (parameters: IUseSignupRequest) => void;
}
