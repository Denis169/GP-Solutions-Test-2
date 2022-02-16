import React from 'react';
import styled from '@emotion/styled';

const Circle = styled.div`
  position: relative;
  border: 10px solid #734b1b;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  margin: 0 0 70px 70px;
  background-color: #c47f12;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  left: -10px;
  height: 2px;
  background-color: #cb1111;
  width: 300px;
  margin-top: 50%;
  transform: rotate(${(props) => props.angle}deg);
`;

const Pizza = ({ arrayAngleLine }) => (
  <Circle>
    {arrayAngleLine.map((line, index) => (
      <Line angle={line} key={String(index)} />))}
  </Circle>
);

export default Pizza;
