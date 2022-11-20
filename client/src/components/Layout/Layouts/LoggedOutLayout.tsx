import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const LoggedOutLayout = () => {
  return (
    <>
      <AppShell>
        <Outlet />
      </AppShell>
    </>
  );
};

export default LoggedOutLayout;
