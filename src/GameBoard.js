import React, { useState, useEffect, useCallback, useMemo } from "react";
import Data from "./Data";
import Card from "./Card";

const GameBoard = ({ setGameBoard, type }) => {
  const [getType] = type;
  const [cardsArray, setCardsArray] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [stopFlip, setStopFlip] = useState(false);
  const [won, setWon] = useState(0);
  const difficulty = useMemo(
    () => ({
      2: won !== 2,
      4: won !== 8,
      6: won !== 18,
    }),
    [won]
  );

  const newGame = useCallback(() => {
    const randomOrderArray = Data[getType]?.sort(() => 0.5 - Math.random());
    setCardsArray(randomOrderArray);
    setFirstCard(null);
    setSecondCard(null);
    setWon(0);
  }, [getType]);

  const handleSelectedCards = (item) => {
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCardsArray((prevArray) =>
          prevArray.map((unit) =>
            unit.name === firstCard.name ? { ...unit, matched: true } : unit
          )
        );
        if (difficulty[getType]) {
          setTimeout(() => {
            setWon((preVal) => preVal + 1);
          }, 1000);
        }
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [difficulty, firstCard, getType, secondCard, type, won]);

  const removeSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
  };
  useEffect(() => {
    newGame();
  }, [newGame]);

  return (
    <>
      {difficulty[getType] ? (
        <div className={`board gr-${getType}`}>
          {cardsArray?.map((item) => (
            <Card
              item={item}
              key={item.id}
              handleSelectedCards={handleSelectedCards}
              toggled={
                item === firstCard ||
                item === secondCard ||
                item.matched === true
              }
              hide={item.matched === true}
              stopflip={stopFlip}
            />
          ))}
        </div>
      ) : (
        <div className="options">
          <div className="gameover">
            <h2>the game is over</h2>
            <button className="button" onClick={() => setGameBoard(false)}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameBoard;
