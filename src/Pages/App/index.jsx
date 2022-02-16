import React, { useState } from 'react';
import ButtonLoad from '../../Components/ButtonLoad';
import { dietsURL, orderPizzaURL, requestURL, currencyURL, orderDrinkURL } from '../../Constants/Url';
import LoaderDisplayNone from '../../Components/LoaderDisplayNone';
import Pizza from '../../Components/Pizza';
import NumberOfPartyParticipants from '../../Components/NumberOfPartyParticipants';
import TotalTable from '../TotalTable';

function App() {
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [displayPizza, setDisplayPizza] = useState(false);
  const [resultEatPizza, setResultEatPizza] = useState();
  const [partyParticipants, setPartyParticipants] = useState();
  const [arrayAngleLine, setArrayAngleLine] = useState([]);
  const [peopleWhoEatPizza, setPeopleWhoEatPizza] = useState();
  const [allPeopleAtParty, setAllPeopleAtParty] = useState([]);
  const [totalOrderPizza, setTotalOrderPizza] = useState();
  const [totalOrderDrink, setTotalOrderDrink] = useState();
  const [pizzaStats, setPizzaStats] = useState();
  const [drinkStats, setDrinkStats] = useState();

  const fetchHowMuchPeople = async (event) => {
    event.preventDefault();
    try {
      setLoading(false);
      setLoader(true);
      setDisplayPizza(false);

      const available = await fetch(requestURL).then((data) => data.json());
      setAllPeopleAtParty(available);

      const bookOfDiets = available.party.reduce((accRow, man, index) => {
        if (man.eatsPizza) {
          return `${accRow + man.name.replace(/ /g, '%20')},`;
        }
        if (available.party.length - 1 === index) {
          return accRow.slice(0, -1);
        }
        return accRow;
      }, '');

      const worldBookOfDiets = await fetch(dietsURL + bookOfDiets).then((data) => data.json());
      setPeopleWhoEatPizza(worldBookOfDiets);

      const howMatchVegan = Math.round(
        (worldBookOfDiets.diet.filter((man) => man.isVegan).length / worldBookOfDiets.diet.length) * 100,
      );

      const whatIsPizza = () => {
        if (howMatchVegan <= 51) {
          return 'meat';
        }
        return Math.random() < 0.5 ? 'vegan' : 'cheese';
      };

      const orderPizza = new Promise((resolve) => {
        fetch(`${orderPizzaURL + whatIsPizza()}/${worldBookOfDiets.diet.length}`)
          .then((data) => resolve(data.json()));
      });

      const currency = new Promise((resolve) => {
        fetch(currencyURL)
          .then((data) => resolve(data.json()));
      });

      const orderDrink = new Promise((resolve) => {
        fetch(orderDrinkURL + available.party.length)
          .then((data) => resolve(data.json()));
      });

      const valueOfTotalOrder = (value, currencyRate) => {
        if (value.slice(-3, value.length) === 'BYN') {
          return (+value.slice(0, value.length - 4)).toFixed(1);
        } if (value.slice(-3, value.length) === 'EUR') {
          return (+value.slice(0, value.length - 4) * currencyRate.EUR).toFixed(1);
        }
        return (+value.slice(0, value.length - 4) * currencyRate.USD).toFixed(1);
      };

      Promise.all([orderPizza, currency, orderDrink])
        .then((value) => {
          setTotalOrderPizza(
            ((valueOfTotalOrder(value[0].price, value[1]) / worldBookOfDiets.diet.length).toFixed(1)
              * worldBookOfDiets.diet.length).toFixed(1),
          );
          setTotalOrderDrink(

            ((valueOfTotalOrder(value[2].price, value[1]) / available.party.length).toFixed(1)
              * available.party.length).toFixed(1),
          );
          setPizzaStats(value[0]);
          setDrinkStats(value[2]);

          setDisplayPizza(true);
          setLoading(true);
          setLoader(false);
        });

      setPartyParticipants(available.party.length);

      const howMatchEatPizza = available.party.filter((participant) => participant.eatsPizza).length;
      setResultEatPizza(howMatchEatPizza);
      let angle = 90;
      const angleLine = 360 / howMatchEatPizza;
      const arrayAngle = [];

      for (let i = 1; i <= howMatchEatPizza / 2; i += 1) {
        arrayAngle.push(angle);
        angle += angleLine;
      }

      setArrayAngleLine(arrayAngle);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ButtonLoad fetchHowMuchPeople={fetchHowMuchPeople} loading={loading} />
      {loader && <LoaderDisplayNone />}
      {displayPizza && <Pizza arrayAngleLine={arrayAngleLine} />}
      {displayPizza && (
        <NumberOfPartyParticipants
          resultEatPizza={resultEatPizza}
          partyParticipants={partyParticipants}
          pizzaStats={pizzaStats}
          drinkStats={drinkStats}
        />
      )}
      {displayPizza && (
      <TotalTable
        allPeopleAtParty={allPeopleAtParty}
        peopleWhoEatPizza={peopleWhoEatPizza}
        totalOrderPizza={totalOrderPizza}
        totalOrderDrink={totalOrderDrink}
      />
      )}
    </>
  );
}

export default App;
