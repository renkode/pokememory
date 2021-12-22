import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function getRandomInt(max) {
  // between 1 and max (inclusive of both)
  return Math.ceil(Math.random() * max);
}

function generateIds(slots, range) {
  let ids = [];
  while (ids.length < slots) {
    let id = getRandomInt(range);
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

function App() {
  const [score, setScore] = useState(0);
  const [slots, setSlots] = useState(6);
  const [pokemon, setPokemon] = useState([]);

  async function getPokemon() {
    const ids = generateIds(slots, 898);
    let promises = [];

    ids.forEach((id) => {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`));
    });

    Promise.all(promises).then((responses) => {
      setPokemon([...responses.map((response) => response.data)]);
    });
  }

  function resetPokemon() {
    setPokemon([]);
    getPokemon();
  }

  function shufflePokemon() {
    let arr = [...pokemon];
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    setPokemon(arr);
  }

  function gameOver() {
    setScore(0);
    resetPokemon();
  }

  function attemptToCatch(pokemon) {
    if (pokemon.caught) {
      gameOver();
    } else {
      pokemon.caught = !pokemon.caught;
      setScore(score + 1);
      shufflePokemon();
    }
  }

  // fetch pokemon on component mount
  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div>
      <div>{score}</div>
      <button onClick={resetPokemon}>Reset</button>
      {pokemon.map((mon, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              attemptToCatch(mon);
            }}
          >
            <img src={mon.sprites.front_default} alt={mon.name} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
