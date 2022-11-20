import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const LoggedInLayout = () => {
  return (
    <AppShell header={<Header />}>
      <Outlet />
    </AppShell>
  );
};

export default LoggedInLayout;
