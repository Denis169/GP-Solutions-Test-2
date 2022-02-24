import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { enterToTableActionCreator } from '../../ActionCreators';

const Button = styled.button`
  width: 300px;
  height: 50px;
  margin: 70px;
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

function LeaveTheTable() {
  const dispatch = useDispatch();
  return (
    <Button type="button" onClick={() => dispatch(enterToTableActionCreator(false))}>Leave the table</Button>
  );
}

export default LeaveTheTable;
