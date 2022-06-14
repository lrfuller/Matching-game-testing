import React, { useState, useEffect } from 'react';
import '../../css/style.css';
import Card from '../card/Card';

export default function App() {
  const cardTypes = ['heart', 'diamond', 'spade', 'club'];
  let [cards, setCards] = useState([]);
  let [currentCards, setCurrentCards] = useState(0);
  let [currentCardsIndex, setCurrentCardsIndex] = useState([]);
  let [matchedCards, setMatchedCards] = useState([]);

  function randomizeOrderOne(types) {
    let newList = [];
    let oldList = types;
    const staticLength = types.length;
    for (let i = 0; i < staticLength; i++) {
      // add element to end, random value
      let tempPos = getRandomInt(oldList.length);
      newList.push({ value: oldList.at(tempPos), showing: false });

      oldList = removeByVal(oldList, oldList.at(tempPos));
    }
    return newList;
  }

  function randomizeOrderTwo(list) {
    let newList = [];
    let oldList = list;
    const staticLength = list.length;
    for (let i = 0; i < staticLength; i++) {
      let tempPos = getRandomInt(oldList.length);
      newList.push(oldList.at(tempPos));

      oldList = removeByIndex(oldList, tempPos);
    }
    console.log('oldList', list, 'newList', newList);
    return newList;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function removeByVal(arr, value) {
    return arr.filter(function (e) {
      return e != value;
    });
  }

  function removeByIndex(arr, index) {
    return arr.filter(function (e, i) {
      return i != index;
    });
  }

  function checkPair() {
    // placing the timeout outside of the use effect causes some unintentional side effects... Always place it within the useEffect not here

    setCurrentCards(0);
    setCurrentCardsIndex([]);

    // console.log(props.currentCardsIndex);

    // TODO
    //flip both cards over
    console.log(matchedCards);
    let tempCard1 = matchedCards[0];
    let tempCard2 = matchedCards[1];
    let c = cards;

    c[tempCard1.index].showing = false;
    c[tempCard2.index].showing = false;
    setCards(c);

    if (tempCard1.value == tempCard2.value) {
      // because we sorted previously, now we can call from last to first. If we call the first delete before the second, then the index will be off and it won't remove the correct element. Also without sorting, it will also remove the wrong element
      delete c[tempCard2.index];
      delete c[tempCard1.index];

      c[tempCard1.index] = { value: 'whitespace' };
      c[tempCard2.index] = { value: 'whitespace' };
      console.log('arrObj', c);
      setCards(c);
    }

    setMatchedCards([]);
  }

  useEffect(() => {
    let tempCards1 = randomizeOrderOne(cardTypes);
    let tempCards2 = randomizeOrderOne(cardTypes);
    let tempCards3 = tempCards1.concat(tempCards2);
    let tempCards4 = randomizeOrderTwo(tempCards3);
    setCards(tempCards4);
  }, []);

  useEffect(() => {
    currentCards == 2
      ? setTimeout(() => {
          checkPair();
        }, '700')
      : null;
  }, [currentCards]);
  return (
    <div className="cardRow">
      {cards.map((c, i) => {
        return (
          <>
            <Card
              // key error appears still with keys set, I think it has to do with the map function not being part of the child. In a previous version I believe the keys error didn't appear which had the map within each child. For the purposes of this program where the number of cards won't change, the key value doesn't matter for performance.
              // key={c}
              card={c}
              i={i}
              cardArrObj={cards}
              setCards={setCards}
              currentCards={currentCards}
              currentCardsIndex={currentCardsIndex}
              setCurrentCardsIndex={setCurrentCardsIndex}
              setCurrentCards={setCurrentCards}
              matchedCards={matchedCards}
              setMatchedCards={setMatchedCards}
              removeByIndex={removeByIndex}
            />
          </>
        );
      })}
    </div>
  );
}
