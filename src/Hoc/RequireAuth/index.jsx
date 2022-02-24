import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const RequireAuth = () => {
  const enterToTable = useSelector(createSelector((state) => state.loading.enterToTable, (data) => data));

  if (!enterToTable) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RequireAuth;
