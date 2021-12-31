import "../App.css";
import React from "react";

const GenerationInput = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        name="gen1"
        onChange={() => props.toggleGeneration(0)}
        checked={props.generations[0].enabled}
      />
      <label htmlFor="gen1"> Gen 1 (RBGY)</label>

      <input
        type="checkbox"
        name="gen2"
        onChange={() => props.toggleGeneration(1)}
        checked={props.generations[1].enabled}
      />
      <label htmlFor="gen2"> Gen 2 (GSC)</label>

      <input
        type="checkbox"
        name="gen3"
        onChange={() => props.toggleGeneration(2)}
        checked={props.generations[2].enabled}
      />
      <label htmlFor="gen3"> Gen 3 (RSE)</label>

      <input
        type="checkbox"
        name="gen4"
        onChange={() => props.toggleGeneration(3)}
        checked={props.generations[3].enabled}
      />
      <label htmlFor="gen4"> Gen 4 (DPPl)</label>

      <input
        type="checkbox"
        name="gen5"
        onChange={() => props.toggleGeneration(4)}
        checked={props.generations[4].enabled}
      />
      <label htmlFor="gen5"> Gen 5 (BW/BW2)</label>

      <input
        type="checkbox"
        name="gen6"
        onChange={() => props.toggleGeneration(5)}
        checked={props.generations[5].enabled}
      />
      <label htmlFor="gen6"> Gen 6 (XY)</label>

      <input
        type="checkbox"
        name="gen7"
        onChange={() => props.toggleGeneration(6)}
        checked={props.generations[6].enabled}
      />
      <label htmlFor="gen7"> Gen 7 (SM/USUM)</label>

      <input
        type="checkbox"
        name="gen8"
        onChange={() => props.toggleGeneration(7)}
        checked={props.generations[7].enabled}
      />
      <label htmlFor="gen8"> Gen 8 (SwSh)</label>
    </div>
  );
};

export default GenerationInput;
