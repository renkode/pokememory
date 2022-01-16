import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingCard from "./components/LoadingCard";
import PokemonCard from "./components/PokemonCard";
import Modal from "react-modal";
import Options from "./components/Options";
import Confetti from "react-confetti";
import pokeball from "./assets/pokeball.png";
import ReactCardFlip from "react-card-flip";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const gens = [
  { generation: 1, min: 1, max: 151, enabled: true },
  { generation: 2, min: 152, max: 251, enabled: true },
  { generation: 3, min: 252, max: 386, enabled: true },
  { generation: 4, min: 387, max: 493, enabled: true },
  { generation: 5, min: 494, max: 649, enabled: true },
  { generation: 6, min: 650, max: 721, enabled: true },
  { generation: 7, min: 722, max: 809, enabled: true },
  { generation: 8, min: 810, max: 898, enabled: true },
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function App() {
  const [pokeballs, setPokeballs] = useState(6);
  const [slots, setSlots] = useState(6);
  const [pokemon, setPokemon] = useState([]);
  const [generations, setGenerations] = useState(gens);
  const [loading, setLoading] = useState(true);
  const [currentModal, setCurrentModal] = useState("options");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [enableFlip, setEnableFlip] = useState(true);

  function findGenerationsRange() {
    // find lowest min and highest max out of all generations to reduce scope of RNG
    let min = 999;
    let max = 1;
    for (let i = 0; i < generations.length; i++) {
      if (!generations[i].enabled) continue;
      if (min > generations[i].min) min = generations[i].min;
      if (max < generations[i].max) max = generations[i].max;
    }
    return { min, max };
  }

  function isInGenerationsRange(num) {
    // check if id is within range of an enabled generation
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
    const idRange = findGenerationsRange();
    const ids = generateIds(slots, idRange.min, idRange.max);
    let promises = [];

    ids.forEach((id) => {
      promises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`));
    });

    // promise.all does not directly return data
    Promise.all(promises)
      .then((responses) => {
        setPokemon([...responses.map((response) => response.data)]);
        setLoading(false);
      })
      .catch((error) => alert(error));
  }

  function resetPokemon() {
    // if no generations are enabled, reset them all to true
    if (generations.filter((g) => g.enabled).length <= 0) {
      for (let g of generations) {
        toggleGeneration(g.generation - 1); //idk why setting generations to initialGens causes the app to hang but ok
      }
    }
    setLoading(true);
    setPokeballs(slots);
    setPokemon([]);
    fetchPokemon();
    setCurrentModal("");
    if (modalIsOpen) closeModal();
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
    if (enableFlip) {
      setIsFlipped(true);
      setTimeout(() => {
        setPokemon(arr);
        setIsFlipped(false);
      }, 750);
    } else {
      setPokemon(arr);
    }
  }

  function attemptToCatch(mon) {
    if (mon.caught) {
      //openModal("gameover");
      resetPokemon();
    } else {
      mon.caught = true;
      setPokeballs(pokeballs - 1); // THIS IS ASYNC!!!!!!
      if (pokeballs <= 1) {
        openModal("victory");
      } else {
        shufflePokemon();
      }
    }
  }

  function handleSlots(e) {
    setSlots(e.target.value);
  }

  function toggleGeneration(index) {
    let newGens = [...generations];
    newGens[index].enabled = !newGens[index].enabled;
    setGenerations(newGens);
  }

  function toggleFlipAnimation() {
    enableFlip ? setEnableFlip(false) : setEnableFlip(true);
  }

  function openModal(type) {
    setCurrentModal(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // fetch pokemon on app mount
  useEffect(() => {
    fetchPokemon();
  }, []);

  let modal = null;
  switch (currentModal) {
    case "rules":
      modal = (
        <div style={{ maxWidth: "300px" }}>
          <p>Gotta catch 'em all!</p>
          <p>
            A random set of Pokemon will appear. To win, you must catch (click)
            on each of them only once. Each subsequent catch will shuffle their
            positions.
          </p>
          <p>
            If you catch a duplicate, it's game over! A new set of wild Pokemon
            will present themselves for you to catch and memorize.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="closeBtn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      );
      break;
    case "victory":
      modal = (
        <div className="modal">
          You caught them all!
          <div className="buttons">
            <button
              className="optionsBtn"
              onClick={() => {
                openModal("options");
              }}
            >
              Options
            </button>
            <button className="resetBtn" onClick={resetPokemon}>
              Reset
            </button>
          </div>
        </div>
      );
      break;
    default:
      modal = (
        <Options
          generations={generations}
          toggleGeneration={toggleGeneration}
          slots={slots}
          handleSlots={handleSlots}
          resetPokemon={resetPokemon}
          closeModal={closeModal}
          enableFlip={enableFlip}
          toggleFlipAnimation={toggleFlipAnimation}
        />
      );
  }

  return (
    <div className="wrapper">
      {currentModal === "victory" && <Confetti />}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modal}
      </Modal>

      {/* {      <div className="pokeballs">
        {Array.from({ length: pokeballs }).map((_, index) => (
          <img key={index} src={pokeball} alt="Pokeball" />
        ))}
      </div>} */}

      <div className="buttons">
        <div className="mainButtons">
          <button
            className="optionsBtn"
            onClick={() => {
              openModal("rules");
            }}
          >
            Rules
          </button>

          <button
            className="optionsBtn"
            onClick={() => {
              openModal("options");
            }}
          >
            Options
          </button>
          <button className="resetBtn" onClick={resetPokemon}>
            Reset
          </button>
        </div>
        <div className="pokeballs">
          <img src={pokeball} alt="Pokeball" />x {pokeballs}
        </div>
      </div>

      <hr />

      <div className="poke-wrapper">
        <div
          className="poke-content"
          style={{
            maxWidth:
              (loading && slots >= 24) || pokemon.length >= 24
                ? "1400px"
                : "1000px",
          }}
        >
          {loading &&
            Array.from({ length: slots }).map((_, index) => (
              <LoadingCard key={index} />
            ))}

          {pokemon.map((mon, index) => {
            return (
              <ReactCardFlip
                key={index}
                isFlipped={isFlipped}
                flipDirection="horizontal"
                containerClassName={`${isFlipped ? "" : "hoverable"}`}
              >
                <PokemonCard
                  key={index}
                  pokemon={mon}
                  attemptToCatch={attemptToCatch}
                  isFlipped={isFlipped}
                />

                <div className="flipside" />
              </ReactCardFlip>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
