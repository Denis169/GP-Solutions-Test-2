import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import RowOfPizzaEaters from '../../Components/RowOfPizzaEaters';
import LeaveTheTable from '../../Components/LeaveTheTable';
import {
  paymentDrinkActionCreator,
  paymentPizzaActionCreator,
} from '../../ActionCreators';

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

const TotalTable = () => {
  const dispatch = useDispatch();
  const peopleWhoEatPizza = useSelector(createSelector((state) => state.loading.bookDiets, (data) => data));
  const totalOrderPizza = useSelector(createSelector((state) => state.loading.totalOrderPizza, (data) => data));
  const totalOrderDrink = useSelector(createSelector((state) => state.loading.totalOrderDrink, (data) => data));
  const partyGuests = useSelector(createSelector((state) => state.loading.partyGuests, (data) => data));
  const moneyToCollect = useSelector(createSelector((state) => state.totalTable.moneyToCollect, (data) => data));
  const moneyCollected = useSelector(createSelector((state) => state.totalTable.moneyCollected, (data) => data));

  useEffect(() => {
    dispatch(paymentPizzaActionCreator((totalOrderPizza / peopleWhoEatPizza.diet.length).toFixed(1)));
    dispatch(paymentDrinkActionCreator((totalOrderDrink / partyGuests.length).toFixed(1)));
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Td>Name</Td>
            <Td>Share to pay</Td>
            <Td>Pay</Td>
          </tr>
        </thead>
        <tbody>
          {partyGuests.map((man, index) => (
            <RowOfPizzaEaters
              man={man}
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
      <LeaveTheTable />
    </>
  );
};

export default TotalTable;
