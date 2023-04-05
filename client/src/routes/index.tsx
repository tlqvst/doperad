import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoggedInLayout from '../components/Layout/Layouts/LoggedInLayout';
import LoggedOutLayout from '../components/Layout/Layouts/LoggedOutLayout';
import { useLoginStatus } from '../features/auth/api/loginStatus/loginStatus';
import { RouteLogin } from './RouteLogin';
import { RouteStart } from './RouteStart';

const AppRoutes = () => {
  const loginStatus = useLoginStatus();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loginStatus.data?.data.isLoggedIn ? (
              <LoggedInLayout />
            ) : (
              <LoggedOutLayout />
            )
          }
        >
          <Route
            index
            element={
              loginStatus.data?.data.isLoggedIn ? (
                <RouteStart />
              ) : (
                <RouteLogin />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
