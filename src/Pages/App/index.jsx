import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ButtonLoad from '../../Components/ButtonLoad';
import Pizza from '../../Components/Pizza';
import NumberOfPartyParticipants from '../../Components/NumberOfPartyParticipants';
import TotalTable from '../TotalTable';
import RequireAuth from '../../Hoc/RequireAuth';
import RequireAuthLoad from '../../Hoc/RequireAuthLoad';
import RecallForm from '../RecallForm';

function App() {
  return (
    <Routes>
      <Route element={<RequireAuthLoad />}>
        <Route path="/" element={<ButtonLoad />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          path="/table"
          element={(
            <>
              <Pizza />
              <NumberOfPartyParticipants />
              <TotalTable />
            </>
          )}
        />
        <Route path="/table/:manName" element={<RecallForm />} />
      </Route>
    </Routes>
  );
}

export default App;
