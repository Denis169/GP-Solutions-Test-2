import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 100px;
  height: 50px;
  margin: 70px;
  font-size: 20px;
  line-height: 28px;
  cursor: pointer;
  border-radius: 8px;
  color: #0505f1;
  background-color: #f87a4c;
`;

function ButtonLoad({ fetchHowMuchPeople, loading }) {
  return (
    <Button type="button" onClick={fetchHowMuchPeople}>{loading ? 'Load' : 'Loading ...'}</Button>
  );
}

export default ButtonLoad;
