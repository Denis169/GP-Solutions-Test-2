import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const RequireAuthLoad = () => {
  const location = useLocation();
  const enterToTable = useSelector(createSelector((state) => state.loading.enterToTable, (data) => data));

  if (enterToTable) {
    return <Navigate to="/table" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuthLoad;
