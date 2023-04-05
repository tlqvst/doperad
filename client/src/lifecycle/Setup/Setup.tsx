import { Loader } from '@mantine/core';
import { useErrorHandler } from 'react-error-boundary';
import { useLoginStatus } from '../../features/auth/api/loginStatus/loginStatus';

/**
 * Inits the application, run any application dependant queries here
 */
const Setup = ({ children }: { children: React.ReactNode }) => {
  const throwError = useErrorHandler();
  const loginStatus = useLoginStatus();

  if (loginStatus.isError && loginStatus.error?.response?.status !== 401)
    throwError('Failed to initialize');

  // Display children if no errors
  if (loginStatus.isFetched) return <>{children}</>;

  // Shows while app is loading
  return <></>;
};

export default Setup;
