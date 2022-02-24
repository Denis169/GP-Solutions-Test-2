import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const NumberOfParticipants = styled.p`
  margin-left: 70px;
  font-size: 24px;
  line-height: 28px;
`;

const NumberOfPartyParticipants = () => {
  const partyGuests = useSelector(createSelector((state) => state.loading.partyGuests, (data) => data));
  const pizzaEaters = useSelector(createSelector((state) => state.loading.bookDiets, (data) => data));
  const pizzaStats = useSelector(createSelector((state) => state.loading.pizzaStats, (data) => data));
  const drinkStats = useSelector(createSelector((state) => state.loading.drinkStats, (data) => data));

  return (
    <>
      <NumberOfParticipants>
        Number of party participants:
        {' '}
        {partyGuests.length}
      </NumberOfParticipants>
      <NumberOfParticipants>
        Pizza eaters:
        {' '}
        {pizzaEaters.diet.length}
      </NumberOfParticipants>
      <NumberOfParticipants>
        Pizza type:
        {' '}
        {pizzaStats.type}
      </NumberOfParticipants>
      <NumberOfParticipants>
        Pizza name:
        {' '}
        { pizzaStats.name }
      </NumberOfParticipants>
      <NumberOfParticipants>
        Cola:
        {' '}
        { drinkStats.qty }
      </NumberOfParticipants>
    </>
  );
};

export default NumberOfPartyParticipants;
