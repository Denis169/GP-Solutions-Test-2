import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import RowOfPizzaEaters from '../../Components/RowOfPizzaEaters';

const Table = styled.table`
  margin: 40px 0 40px 70px;
  border-collapse: collapse;
  width: 60vw;
  table-layout: fixed;
`;

const Td = styled.td`
  border: 1px solid #000000;
  padding: 10px;
  font-size: 20px;
`;

const TotalTable = ({ peopleWhoEatPizza, totalOrderPizza, totalOrderDrink, allPeopleAtParty }) => {
  const [paymentPizza, setPaymentPizza] = useState();
  const [paymentDrink, setPaymentDrink] = useState();
  const [moneyToCollect, setMoneyToCollect] = useState(+totalOrderPizza + +totalOrderDrink);
  const [moneyCollected, setMoneyCollected] = useState(0);

  useEffect(() => {
    setMoneyToCollect((+totalOrderPizza + +totalOrderDrink).toFixed(1));
    setPaymentPizza((totalOrderPizza / peopleWhoEatPizza.diet.length).toFixed(1));
    setPaymentDrink((totalOrderDrink / allPeopleAtParty.party.length).toFixed(1));
  }, [peopleWhoEatPizza, totalOrderPizza, totalOrderDrink]);

  return (
    <Table>
      <thead>
        <tr>
          <Td>Name</Td>
          <Td>Share to pay</Td>
          <Td>Pay</Td>
        </tr>
      </thead>
      <tbody>
        {allPeopleAtParty.party.map((man, index) => (
          <RowOfPizzaEaters
            name={man.name}
            isVegan={man.eatsPizza ? peopleWhoEatPizza.diet.find((person) => person.name === man.name).isVegan : false}
            payment={man.eatsPizza ? (+paymentPizza + +paymentDrink).toFixed(1) : +paymentDrink}
            moneyToCollect={moneyToCollect}
            setMoneyToCollect={setMoneyToCollect}
            moneyCollected={moneyCollected}
            setMoneyCollected={setMoneyCollected}
            key={String(index)}
          />
        ))}
        <tr>
          <Td>Total order</Td>
          <Td>{`${(+totalOrderPizza + +totalOrderDrink).toFixed(1)} BYN`}</Td>
          <Td> </Td>
        </tr>
        <tr>
          <Td>Money to collect</Td>
          <Td>{`${moneyToCollect} BYN`}</Td>
          <Td> </Td>
        </tr>
        <tr>
          <Td>Money collected</Td>
          <Td>{`${moneyCollected} BYN`}</Td>
          <Td> </Td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TotalTable;
