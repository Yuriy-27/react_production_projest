import { getUserAuthData } from 'entities/User';
import {
  memo, Suspense, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, RouteConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

function AppRouter() {
  const renderWithWrapper = useCallback(
    (route: AppRoutesProps) => {
      const element = (
        <div className="content-wrapper">
          {route.element}
        </div>
      );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={(
            <div className="content-wrapper">
              {route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            </div>
          )}
        />
      );
    },
    [],
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(RouteConfig).map(renderWithWrapper)}
      </Routes>
    </Suspense>
  );
}

export default memo(AppRouter);
