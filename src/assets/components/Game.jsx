import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./Game.css";
import Card from "../components/Card";

const Game = observer(({ store, initialValues }) => {
  const backsideImageUrl = "../public/images/background.jpg";

  useEffect(() => {
    store.setupCards(initialValues);
  }, [store, initialValues]);

  return (
    <>
      <div className="info">
        <p>Moves: {store.moves}</p>
        <p>Matched Pairs: {store.matchedPairs}</p>
      </div>
      <div className="game">
        <div className="cards">
          {store.cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              flipCard={store.flipCard}
              backsideImageUrl={backsideImageUrl}
            />
          ))}
        </div>
        {store.gameFinished && (
          <div className="congratulations">Congratulations, you won!</div>
        )}
      </div>
    </>
  );
});

export default Game;
