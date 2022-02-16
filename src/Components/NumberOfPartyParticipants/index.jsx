import React from 'react';
import styled from '@emotion/styled';

const NumberOfParticipants = styled.p`
  margin-left: 70px;
  font-size: 24px;
  line-height: 28px;
`;

const NumberOfPartyParticipants = ({ resultEatPizza, partyParticipants, pizzaStats, drinkStats }) => (
  <>
    <NumberOfParticipants>
      Number of party participants:
      {' '}
      {partyParticipants}
    </NumberOfParticipants>
    <NumberOfParticipants>
      Pizza eaters:
      {' '}
      {resultEatPizza}
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

export default NumberOfPartyParticipants;
