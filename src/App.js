import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GenerationInput from "./components/GenerationInput";
import LoadingCard from "./components/LoadingCard";
import PokemonCard from "./components/PokemonCard";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function findMinAndMax(arr) {
  let min = 999;
  let max = 1;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].enabled) continue;
    if (min > arr[i].min) min = arr[i].min;
    if (max < arr[i].max) max = arr[i].max;
  }
  //console.log(`min:  ${min}, max: ${max}`);
  return { min, max };
}

function App() {
  const initialGens = [
    { generation: 1, min: 1, max: 151, enabled: true },
    { generation: 2, min: 152, max: 251, enabled: true },
    { generation: 3, min: 252, max: 386, enabled: true },
    { generation: 4, min: 387, max: 493, enabled: true },
    { generation: 5, min: 494, max: 649, enabled: true },
    { generation: 6, min: 650, max: 721, enabled: true },
    { generation: 7, min: 722, max: 809, enabled: true },
    { generation: 8, min: 810, max: 898, enabled: true },
  ];
  const [pokeballs, setPokeballs] = useState(6);
  const [slots, setSlots] = useState(6);
  const [pokemon, setPokemon] = useState([]);
  const [generations, setGenerations] = useState(initialGens);
  const [loading, setLoading] = useState(true);

  function isInGenerationsRange(num) {
    let isIncluded = false;
    generations.forEach((gen) => {
      if (gen.enabled && num >= gen.min && num <= gen.max) isIncluded = true;
    });
    return isIncluded;
  }

  function generateIds(slots, min, max) {
    let ids = [];
    while (ids.length < slots) {
      let id = getRandomIntInclusive(min, max);
      if (!ids.includes(id) && isInGenerationsRange(id)) ids.push(id);
    }
    return ids;
  }

  async function fetchPokemon() {
    const idRange = findMinAndMax(generations);
    const ids = generateIds(slots, idRange.min, idRange.max);
    let promises = [];

    ids.forEach((id) => {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`));
    });

    // promise.all does not directly return data
    Promise.all(promises).then((responses) => {
      setPokemon([...responses.map((response) => response.data)]);
      setLoading(false);
    });
  }

  function resetPokemon() {
    console.log(generations.filter((g) => g.enabled));
    if (generations.filter((g) => g.enabled).length <= 0) {
      for (let g of generations) {
        toggleGeneration(g.generation - 1); //idk why setting generations to initialGens causes the app to hang but ok
      }
    }
    setLoading(true);
    setPokeballs(slots);
    setPokemon([]);
    fetchPokemon();
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

  function attemptToCatch(mon) {
    if (mon.caught) {
      resetPokemon();
    } else {
      mon.caught = true;
      setPokeballs(pokeballs - 1);
      shufflePokemon();
    }
  }

  function handleChange(e) {
    setSlots(e.target.value);
  }

  function toggleGeneration(index) {
    let newGens = [...generations];
    newGens[index].enabled = !newGens[index].enabled;
    setGenerations(newGens);
  }

  // fetch pokemon on component mount
  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <GenerationInput
        generations={generations}
        toggleGeneration={toggleGeneration}
      />

      <div>Pokeballs Left: {pokeballs}</div>
      <label htmlFor="cards">Number of Pokemon:</label>
      <select name="cards" id="cards" onChange={handleChange}>
        <option value="6" defaultValue>
          6
        </option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="30">30</option>
      </select>
      <button onClick={resetPokemon}>Reset</button>

      <div className="poke-wrapper">
        {loading &&
          Array.from({ length: slots }).map((_, index) => (
            <LoadingCard key={index} />
          ))}

        {pokemon.map((mon, index) => {
          return (
            <PokemonCard
              key={index}
              pokemon={mon}
              attemptToCatch={attemptToCatch}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
