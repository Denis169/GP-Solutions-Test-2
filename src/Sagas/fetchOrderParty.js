import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PARTY_GUESTS_URL } from '../Constants/LoadConst';
import {
  arrayAngleActionCreator,
  bookDietsActionCreator,
  drinkStatsActionCreator,
  enterToTableActionCreator,
  loadingActionCreator,
  moneyCollectedActionCreator, moneyToCollectActionCreator,
  partyGuestsActionCreator,
  pizzaStatsActionCreator,
  totalOrderDrinkActionCreator,
  totalOrderPizzaActionCreator,
} from '../ActionCreators';
import { currencyURL, dietsURL, orderDrinkURL, orderPizzaURL } from '../Assets/Url';

const bookOfDiets = (partyGuests) => partyGuests.party.reduce((accRow, man, index) => {
  if (man.eatsPizza) {
    return `${accRow + man.name.replace(/ /g, '%20')},`;
  }
  if (partyGuests.party.length - 1 === index) {
    return accRow.slice(0, -1);
  }
  return accRow;
}, '');

const whatIsPizza = (peopleWhoEatPizza) => {
  if (Math.round(
    (peopleWhoEatPizza.diet.filter((man) => man.isVegan).length / peopleWhoEatPizza.diet.length) * 100,
  ) <= 51) {
    return 'meat';
  }
  return Math.random() < 0.5 ? 'vegan' : 'cheese';
};

const valueOfTotalOrder = (value, currencyRate) => {
  if (value.slice(-3, value.length) === 'BYN') {
    return (+value.slice(0, value.length - 4)).toFixed(1);
  } if (value.slice(-3, value.length) === 'EUR') {
    return (+value.slice(0, value.length - 4) * currencyRate.EUR).toFixed(1);
  }
  return (+value.slice(0, value.length - 4) * currencyRate.USD).toFixed(1);
};

const arrayOfAngle = (pizzaEatersJson) => {
  const howMatchEatPizza = pizzaEatersJson.diet.length;
  let angle = 90;
  const angleLine = 360 / howMatchEatPizza;
  const arrayAngle = [];

  for (let i = 1; i <= howMatchEatPizza / 2; i += 1) {
    arrayAngle.push(angle);
    angle += angleLine;
  }

  return arrayAngle;
};

function* fetchOrderParty({ payload }) {
  try {
    const party = yield call(() => fetch(payload));

    const partyJson = yield call(() => new Promise((resolve) => {
      resolve(party.json());
    }));

    const pizzaEaters = yield call(() => fetch(dietsURL + bookOfDiets(partyJson)));

    const pizzaEatersJson = yield call(() => new Promise((resolve) => {
      resolve(pizzaEaters.json());
    }));

    yield put(partyGuestsActionCreator(partyJson.party));

    yield put(bookDietsActionCreator(pizzaEatersJson));

    const { orderPizza, currency, orderDrink } = yield all({
      orderPizza: call(() => fetch(`${orderPizzaURL + whatIsPizza(pizzaEatersJson)}/${pizzaEatersJson.diet.length}`)),
      currency: call(() => fetch(currencyURL)),
      orderDrink: call(() => fetch(orderDrinkURL + partyJson.party.length)),
    });

    const orderPizzaJson = yield call(() => new Promise((resolve) => {
      resolve(orderPizza.json());
    }));

    const currencyJson = yield call(() => new Promise((resolve) => {
      resolve(currency.json());
    }));

    const orderDrinkJson = yield call(() => new Promise((resolve) => {
      resolve(orderDrink.json());
    }));

    yield put(totalOrderPizzaActionCreator(
      ((valueOfTotalOrder(orderPizzaJson.price, currencyJson) / pizzaEatersJson.diet.length).toFixed(1)
      * pizzaEatersJson.diet.length).toFixed(1),
    ));
    yield put(totalOrderDrinkActionCreator(
      ((valueOfTotalOrder(orderDrinkJson.price, currencyJson) / partyJson.party.length).toFixed(1)
        * partyJson.party.length).toFixed(1),
    ));

    yield put(pizzaStatsActionCreator(orderPizzaJson));

    yield put(drinkStatsActionCreator(orderDrinkJson));

    yield put(enterToTableActionCreator(true));

    yield put(arrayAngleActionCreator(arrayOfAngle(pizzaEatersJson)));

    yield put(moneyCollectedActionCreator(0));

    yield put(moneyToCollectActionCreator(
      (+(((valueOfTotalOrder(orderPizzaJson.price, currencyJson) / pizzaEatersJson.diet.length).toFixed(1)
        * pizzaEatersJson.diet.length).toFixed(1))
        + +(((valueOfTotalOrder(orderDrinkJson.price, currencyJson) / partyJson.party.length).toFixed(1)
          * partyJson.party.length).toFixed(1))).toFixed(1),
    ));

    yield put(loadingActionCreator(true));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* watcherFetchOrderParty() {
  yield takeLatest(PARTY_GUESTS_URL, fetchOrderParty);
}

export default watcherFetchOrderParty;
