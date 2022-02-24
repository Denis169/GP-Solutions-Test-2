import { handleActions } from 'redux-actions';
import {
  arrayAngleActionCreator,
  bookDietsActionCreator, drinkStatsActionCreator,
  enterToTableActionCreator, loadingActionCreator, partyGuestsActionCreator,
  partyGuestsUrlActionCreator, pizzaStatsActionCreator, totalOrderDrinkActionCreator, totalOrderPizzaActionCreator,
} from '../ActionCreators';

const initialState = {
  loading: true,
  arrayAngle: [],
  drinkStats: {},
  pizzaStats: {},
  totalOrderDrink: '',
  totalOrderPizza: '',
  bookDiets: {},
  partyGuests: {},
  partyGuestsUrl: '',
  enterToTable: false,
};

const loadingReducer = handleActions(
  {
    [partyGuestsUrlActionCreator]: (state, { payload }) => ({ ...state, partyGuestsUrl: payload }),
    [enterToTableActionCreator]: (state, { payload }) => ({ ...state, enterToTable: payload }),
    [partyGuestsActionCreator]: (state, { payload }) => ({ ...state, partyGuests: payload }),
    [bookDietsActionCreator]: (state, { payload }) => ({ ...state, bookDiets: payload }),
    [totalOrderPizzaActionCreator]: (state, { payload }) => ({ ...state, totalOrderPizza: payload }),
    [totalOrderDrinkActionCreator]: (state, { payload }) => ({ ...state, totalOrderDrink: payload }),
    [pizzaStatsActionCreator]: (state, { payload }) => ({ ...state, pizzaStats: payload }),
    [drinkStatsActionCreator]: (state, { payload }) => ({ ...state, drinkStats: payload }),
    [arrayAngleActionCreator]: (state, { payload }) => ({ ...state, arrayAngle: payload }),
    [loadingActionCreator]: (state, { payload }) => ({ ...state, loading: payload }),
  },
  initialState,
);

export default loadingReducer;
