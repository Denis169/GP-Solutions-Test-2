import React from 'react';
import styled from '@emotion/styled';

const Loader = styled.div`
  position: absolute;
  top: 285px;
  left: calc(50% - 100px);
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoaderDisplayNone = () => (
  <Loader />
);

export default LoaderDisplayNone;
