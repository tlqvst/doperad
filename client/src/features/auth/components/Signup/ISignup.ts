import { UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { IUseSignupRequest } from '../../../features/auth/api/signup/ISignup';

export interface ISignup {
  onSignup: (parameters: IUseSignupRequest) => void;
}
