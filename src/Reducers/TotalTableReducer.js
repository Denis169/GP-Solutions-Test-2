import { handleActions } from 'redux-actions';
import {
  moneyCollectedActionCreator,
  moneyToCollectActionCreator,
  paymentDrinkActionCreator,
  paymentPizzaActionCreator,
} from '../ActionCreators';

const initialState = {
  paymentPizza: '',
  paymentDrink: '',
  moneyToCollect: '',
  moneyCollected: '',
};

const totalTableReducer = handleActions(
  {
    [paymentPizzaActionCreator]: (state, { payload }) => ({ ...state, paymentPizza: payload }),
    [paymentDrinkActionCreator]: (state, { payload }) => ({ ...state, paymentDrink: payload }),
    [moneyToCollectActionCreator]: (state, { payload }) => ({ ...state, moneyToCollect: payload }),
    [moneyCollectedActionCreator]: (state, { payload }) => ({ ...state, moneyCollected: payload }),
  },
  initialState,
);

export default totalTableReducer;
