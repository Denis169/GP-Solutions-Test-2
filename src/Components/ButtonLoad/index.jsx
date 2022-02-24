import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import LoaderDisplayNone from '../LoaderDisplayNone';
import { loadingActionCreator, partyGuestsUrlActionCreator } from '../../ActionCreators';
import { requestURL } from '../../Assets/Url';

const Button = styled.button`
  display: block;
  width: 200px;
  height: 50px;
  margin: 70px auto;
  font-size: 20px;
  line-height: 28px;
  cursor: pointer;
  border-radius: 8px;
  color: #0505f1;
  background-color: #f87a4c;
  :active{
    opacity: 0.7;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
`;

function ButtonLoad() {
  const dispatch = useDispatch();
  const loading = useSelector(createSelector((state) => state.loading.loading, (data) => data));

  const fetchHowMuchPeople = async (event) => {
    event.preventDefault();
    dispatch(loadingActionCreator(false));
    dispatch(partyGuestsUrlActionCreator(requestURL));
  };

  return (
    <>
      <Button type="button" onClick={fetchHowMuchPeople}>{loading ? 'Load' : 'Loading ...'}</Button>
      {!loading && <LoaderDisplayNone />}
    </>
  );
}

export default ButtonLoad;
