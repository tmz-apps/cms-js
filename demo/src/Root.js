import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary, Loading, Navbar } from '@tmz-apps/cms-js/components/index.js';
import isAuthenticated from '@tmz-apps/cms-js/plugins/iam/selectors/isAuthenticated.js';
import getUser from '@tmz-apps/cms-js/plugins/iam/selectors/getUser.js';
import loadUser from '@tmz-apps/cms-js/plugins/iam/actions/loadUser.js';
import AppRoutes from './config/Routes.js';

const Login = lazy(() => import('@tmz-apps/cms-js/plugins/iam/components/login-screen/index.js'));
const LoggedOut = () => <Routes><Route path="*" element={<Login />} /></Routes>;

function LoggedIn() {
  const user = useSelector(getUser);
  if (!user) {
    return <Loading />;
  }

  return (
    <div id="wrapper" className={`app-env-${APP_ENV}`} data-slidedirection>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default function Root() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isAuthenticated);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUser());
    }
  }, [isLoggedIn]);

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
      </BrowserRouter>
    </Suspense>
  );
}
