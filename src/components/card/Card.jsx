import React, { useState, useEffect } from 'react';

export default function Card(props) {
  const icons = (
    <>
      {props.card.value == 'heart' ? (
        <>
          {props.card.showing ? (
            <div className="card">
              <i className="bi bi-suit-heart-fill"></i>
            </div>
          ) : (
            <div className="card">
              <div className="emptySpace"></div>
            </div>
          )}
        </>
      ) : props.card.value == 'club' ? (
        <>
          {props.card.showing ? (
            <div className="card">
              <i className="bi bi-suit-club-fill"></i>
            </div>
          ) : (
            <div className="card">
              <div className="emptySpace"></div>
            </div>
          )}
        </>
      ) : props.card.value == 'diamond' ? (
        <>
          {props.card.showing ? (
            <div className="card">
              <i className="bi bi-diamond-fill"></i>
            </div>
          ) : (
            <div className="card">
              <div className="emptySpace"></div>
            </div>
          )}
        </>
      ) : props.card.value == 'spade' ? (
        <>
          {props.card.showing ? (
            <div className="card">
              <i className="bi bi-suit-spade-fill"></i>
            </div>
          ) : (
            <div className="card">
              <div className="emptySpace"></div>
            </div>
          )}
        </>
      ) : (
        <div className="whiteSpace"></div>
      )}
    </>
  );
  let [allowClick, setAllowClick] = useState(true);

  // updating values within parent
  function cardClicked(c) {
    let tempCC = props.currentCards;
    let tempMC = props.matchedCards;
    let tempI = props.currentCardsIndex;
    let tempC = props.cardArrObj;
    tempC[props.i].showing = true;

    tempCC++;
    tempMC.push({ value: c, index: props.i });
    // sorting for later when comparing values. Without this it won't know which index to remove
    tempMC.sort((a, b) => (a.index > b.index ? 1 : -1));
    tempI.push(props.i);
    props.setMatchedCards(tempMC);
    props.setCards(tempC);
    props.setCurrentCards(tempCC);
    props.setCurrentCardsIndex(tempI);
  }

  useEffect(() => {
    if (props.currentCards > 1) {
      setAllowClick(false);
      setTimeout(() => {
        setAllowClick(true);
      }, '700');
    }
  }, [props.currentCards]);

  return (
    <>
      {allowClick ? (
        <div onClick={() => cardClicked(props.card.value)}>{icons}</div>
      ) : (
        <div>{icons}</div>
      )}
    </>
  );
}
