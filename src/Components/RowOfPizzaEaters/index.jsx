import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import ButtonPay from '../ButtonPay';
import { moneyCollectedActionCreator, moneyToCollectActionCreator, partyGuestsActionCreator } from '../../ActionCreators';

const Td = styled.td`
  border: 1px solid #000000;
  color: ${(props) => props.colorText};
  padding: 10px;
  font-size: 20px;
`;

const LinkForm = styled(Link)`
  text-decoration:none;
  color: ${(props) => props.vegan};
`;

const RowOfPizzaEaters = ({ man }) => {
  const dispatch = useDispatch();
  const peopleWhoEatPizza = useSelector(createSelector((state) => state.loading.bookDiets, (data) => data));
  const paymentPizza = useSelector(createSelector((state) => state.totalTable.paymentPizza, (data) => data));
  const paymentDrink = useSelector(createSelector((state) => state.totalTable.paymentDrink, (data) => data));
  const moneyToCollect = useSelector(createSelector((state) => state.totalTable.moneyToCollect, (data) => data));
  const moneyCollected = useSelector(createSelector((state) => state.totalTable.moneyCollected, (data) => data));
  const partyGuests = useSelector(createSelector((state) => state.loading.partyGuests, (data) => data));

  const payment = () => (man.eatsPizza ? (+paymentPizza + +paymentDrink).toFixed(1) : +paymentDrink);

  const userPay = () => {
    dispatch(moneyToCollectActionCreator((moneyToCollect - +payment()).toFixed(1)));
    dispatch(moneyCollectedActionCreator((+moneyCollected + +payment()).toFixed(1)));
    const manIndex = partyGuests.findIndex((people) => people.name === man.name);
    const manNewData = { ...partyGuests[manIndex], haveToPay: true };
    dispatch(partyGuestsActionCreator(
      partyGuests.map((item) => {
        if (item.name === man.name) {
          return manNewData;
        }
        return item;
      }),
    ));
  };

  const isVegan = () => {
    if (peopleWhoEatPizza.diet.find((person) => person.name === man.name).isVegan) {
      return '#00DB00';
    }
    return '#000000';
  };

  return (
    <tr>
      {man.eatsPizza && (
      <Td>
        <LinkForm to={`/table/${man.name}`} vegan={isVegan()}>
          {man.feedback ? (
            <>
              <span>&#9989;</span>
              <span>{man.name}</span>
            </>
          ) : man.name}
        </LinkForm>
      </Td>
      )}
      {!man.eatsPizza && (<Td colorText="#A9A9A9FF" cursor="default">{man.name}</Td>)}
      <Td>{man.haveToPay ? '0 BYN' : `${payment()} BYN`}</Td>
      <Td>
        <ButtonPay userPay={userPay} changePayPaid={man.haveToPay} />
      </Td>
    </tr>
  );
};

export default RowOfPizzaEaters;
