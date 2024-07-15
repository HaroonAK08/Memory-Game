import React from "react";
import { observer } from "mobx-react-lite";
import "./Card.css";

const Card = observer(({ card, flipCard, backsideImageUrl }) => {
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(card)}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={card.imageUrl} alt={card.value} />
        </div>
        <div className="card-back">
          <img src={backsideImageUrl} alt="backside" />
        </div>
      </div>
    </div>
  );
});

export default Card;
