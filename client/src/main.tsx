import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import Setup from './lifecycle/Setup/Setup';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
      retry: 0,
    },
  },
});

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme: 'dark', primaryColor: 'orange' }}
      >
        <NotificationsProvider>
          <ModalsProvider>
            <QueryClientProvider client={queryClient}>
              <Setup>
                <AppRoutes />
              </Setup>
            </QueryClientProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
