import { Alert, Box, Container, Image, Paper, Tabs } from '@mantine/core';
import { useState } from 'react';
import Login from '../features/auth/components/Login/Login';
import { IconDoor, IconForms } from '@tabler/icons';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { useSignup } from '../features/auth/api/signup/signup';
import Signup from '../features/auth/components/Signup/Signup';

/** Initial view of the application when not logged in or signed up */
export const RouteLogin = () => {
  const signupMutation = useSignup();
  const [activeTab, setActiveTab] = useState<
    string | 'login' | 'signup' | null
  >('login');

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Container mt="xl">
          <Paper
            shadow={'lg'}
            p={'xl'}
            sx={{ maxWidth: '320px' }}
            mx="auto"
            withBorder
          >
            <Box>
              <Image mb="xl" src="/images/doperad.svg" />

              <Tabs
                value={activeTab}
                onTabChange={setActiveTab}
                variant="pills"
              >
                <Tabs.List grow>
                  <Tabs.Tab value="login" icon={<IconDoor size={16} />}>
                    Login
                  </Tabs.Tab>
                  <Tabs.Tab value="signup" icon={<IconForms size={16} />}>
                    Signup
                  </Tabs.Tab>
                </Tabs.List>

                {signupMutation.isSuccess && (
                  <Alert color="green" title="Success!" mt="md">
                    Your account has been registered!
                  </Alert>
                )}

                <Tabs.Panel value="login">
                  <Login />
                </Tabs.Panel>

                <Tabs.Panel value="signup">
                  <>
                    {signupMutation.isError && (
                      <Alert mt="md" color="red" title="Error">
                        {signupMutation?.error?.response?.data?.message}
                      </Alert>
                    )}
                    <Signup
                      onSignup={(parameters) =>
                        signupMutation
                          .mutateAsync(parameters)
                          .then(() => setActiveTab('login'))
                      }
                    />
                  </>
                </Tabs.Panel>
              </Tabs>
            </Box>
          </Paper>
        </Container>
      </ErrorBoundary>
    </>
  );
};
