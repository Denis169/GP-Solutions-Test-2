import React, { useState } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  margin: 5px;
  border-radius: 8px;
  border: 2px solid #000000;
  background-color: #5F9EA0FF;
  font-size: 30px;
  width: 70px;
  cursor: pointer;
`;

const ButtonSecond = styled.button`
  margin: 5px;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgba(95, 158, 160, 0.5);
  font-size: 30px;
  width: 70px;
  color: rgba(0, 0, 0, 0.5);
`;

const ButtonPay = ({ userPay }) => {
  const [changePayPaid, setChangePayPaid] = useState(true);
  const pressButton = () => {
    setChangePayPaid(false);
    userPay();
  };

  return (
    <>
      {changePayPaid && <Button onClick={pressButton}>PAY</Button>}
      {!changePayPaid && <ButtonSecond>PAID</ButtonSecond>}
    </>
  );
};

export default ButtonPay;
