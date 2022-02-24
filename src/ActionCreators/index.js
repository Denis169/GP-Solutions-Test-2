import { createAction } from 'redux-actions';

import {
  ENTER_TO_TABLE,
  PARTY_GUESTS,
  PARTY_GUESTS_URL,
  BOOK_DIETS,
  TOTAL_ORDER_PIZZA,
  TOTAL_ORDER_DRINK,
  PIZZA_STATS, DRINK_STATS, ARRAY_ANGLE, LOADING,
} from '../Constants/LoadConst';
import { PAYMENT_PIZZA, PAYMENT_DRINK, MONEY_TO_COLLECT, MONEY_COLLECTED } from '../Constants/TotalTableConst';

// Loading

export const partyGuestsUrlActionCreator = createAction(PARTY_GUESTS_URL);
export const enterToTableActionCreator = createAction(ENTER_TO_TABLE);
export const partyGuestsActionCreator = createAction(PARTY_GUESTS);
export const bookDietsActionCreator = createAction(BOOK_DIETS);
export const totalOrderPizzaActionCreator = createAction(TOTAL_ORDER_PIZZA);
export const totalOrderDrinkActionCreator = createAction(TOTAL_ORDER_DRINK);
export const pizzaStatsActionCreator = createAction(PIZZA_STATS);
export const drinkStatsActionCreator = createAction(DRINK_STATS);
export const arrayAngleActionCreator = createAction(ARRAY_ANGLE);
export const loadingActionCreator = createAction(LOADING);

// TotalTable

export const paymentPizzaActionCreator = createAction(PAYMENT_PIZZA);
export const paymentDrinkActionCreator = createAction(PAYMENT_DRINK);
export const moneyToCollectActionCreator = createAction(MONEY_TO_COLLECT);
export const moneyCollectedActionCreator = createAction(MONEY_COLLECTED);
