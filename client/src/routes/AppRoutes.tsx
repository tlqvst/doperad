import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoggedInLayout from '../components/Layout/Layouts/LoggedInLayout';
import LoggedOutLayout from '../components/Layout/Layouts/LoggedOutLayout';
import useProfile from '../hooks/auth/useLoginStatus/useLoginStatus';
import PageStart from '../pages/PageStart/PageStart';
import PageLoggedIn from '../pages/PageLoggedIn/PageLoggedIn';

const AppRoutes = () => {
  const profile = useProfile();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            profile.data?.data.isLoggedIn ? (
              <LoggedInLayout />
            ) : (
              <LoggedOutLayout />
            )
          }
        >
          <Route
            index
            element={
              profile.data?.data.isLoggedIn ? <PageLoggedIn /> : <PageStart />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
