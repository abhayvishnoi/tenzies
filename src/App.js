import React, { useState } from "react";
import Die from "./dice";
import Confetti from "react-confetti";

import { nanoid } from "nanoid";
function App() {
  function generateNewDie() {
    return {
      isHeld: false,
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
    };
  }
  function allNewDice() {
    let newDice = [];
    for (var i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const [dice, setDice] = React.useState(allNewDice());

  function holdDice(id) {
    // console.log(id);
    setDice((prevDice) =>
      prevDice.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item
      )
    );
  }

  const diceElements = dice.map((item) => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      toggle={() => holdDice(item.id)}
    />
  ));
  const time = new Date().getTime();
  // function timeDifference() {
  //   console.log(new Date().getTime() - stats.time);
  // }
  var statsobj = { moves: 0, time: time };
  const [stats, setstats] = useState(statsobj);

  function rollDice() {
    if (tenzies) {
      settenzies(false);
      setDice(allNewDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((item) => (item.isHeld ? item : generateNewDie()))
      );
      setstats((stats) => ({ ...stats, moves: stats.moves + 1 }));
    }
  }

  const [tenzies, settenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((item) => item.isHeld);
    const allSame = dice.every((item) => item.value === dice[0].value);
    if (allHeld && allSame) {
      settenzies(true);
      // timeDifference();
    }
  }, [dice]);

  return (
    <main>
      {tenzies && <Confetti className="confetti" height={400} />}
      <h1>Tenzies</h1>
      {tenzies ? (
        <h3 className="congrats">
          Congratulations! You Won
          <br />
          <span className="total-rolls">Rolls: {stats.moves}</span>
          {/* <span className="total-rolls">Time: {stats.time}</span>
          <span className="total-rolls">Best Time: {stats.time}</span> */}
        </h3>
      ) : (
        <h4>
          {
            "Roll untill all dice are the same.Click each die to freeze it at it's current value between rolls."
          }
        </h4>
      )}

      <div className="dice-grid">{diceElements}</div>
      <button
        className={tenzies ? "play-button" : "roll-button"}
        onClick={rollDice}
      >
        {tenzies ? "PLAY AGAIN" : "ROLL"}
      </button>
    </main>
  );
}

export default App;
