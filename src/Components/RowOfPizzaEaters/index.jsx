import React, { useState } from 'react';
import styled from '@emotion/styled';
import ButtonPay from '../ButtonPay';

const Td = styled.td`
  border: 1px solid #000000;
  color: ${(props) => props.isVegan} ;
  padding: 10px;
  font-size: 20px;
`;

const RowOfPizzaEaters = ({
  name,
  isVegan,
  payment,
  setMoneyToCollect,
  moneyToCollect,
  moneyCollected,
  setMoneyCollected,
}) => {
  const [haveToPay, setHaveToPay] = useState(true);

  const userPay = () => {
    setMoneyToCollect((moneyToCollect - +payment).toFixed(1));
    setMoneyCollected((+moneyCollected + +payment).toFixed(1));
    setHaveToPay(false);
  };

  return (
    <tr>
      <Td isVegan={isVegan ? '#00DB00' : 'black'}>{name}</Td>
      <Td>{haveToPay ? `${payment} BYN` : '0 BYN'}</Td>
      <Td>
        <ButtonPay userPay={userPay} />
      </Td>
    </tr>
  );
};

export default RowOfPizzaEaters;
