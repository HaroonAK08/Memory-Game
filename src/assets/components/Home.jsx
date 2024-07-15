import React from "react";
import { useLocalStore } from "mobx-react-lite";
import Game from "./Game";
import "./Home.css";
import GameStore from "../../app/GameStore";

const initialValues = [
  { name: "A", imageUrl: "../public/images/smbl1.jpeg" },
  { name: "B", imageUrl: "../public/images/smbl2.jpeg" },
  { name: "C", imageUrl: "../public/images/smbl3.jpeg" },
  { name: "D", imageUrl: "../public/images/smbl4.jpeg" },
  { name: "E", imageUrl: "../public/images/smbl5.jpeg" },
  { name: "F", imageUrl: "../public/images/smbl6.jpg" },
  { name: "G", imageUrl: "../public/images/smbl7.jpeg" },
  { name: "H", imageUrl: "../public/images/smbl8.jpeg" },
];

const Home = () => {
  const store = useLocalStore(() => GameStore.create({ cards: [] }));

  const newGame = () => {
    store.resetGame(initialValues);
  };

  return (
    <div>
      <div className="Main">
        <h1>Memory Game</h1>
        <button className="btn1" onClick={newGame}>
          New Game
        </button>
      </div>
      <div className="game">
        <Game store={store} initialValues={initialValues} />
      </div>
    </div>
  );
};

export default Home;
