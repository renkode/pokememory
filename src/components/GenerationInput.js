import "../App.css";
import React, { memo } from "react";

const GenerationInput = (props) => {
  return (
    <div className="checkboxes">
      <h4 style={{ marginTop: "0px", marginBottom: "4px" }}>Generations:</h4>
      <div className="checkbox">
        <input
          type="checkbox"
          id="gen1"
          onChange={() => props.toggleGeneration(0)}
          checked={props.generations[0].enabled}
        />
        <label htmlFor="gen1"> Gen 1 (RBGY)</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="gen2"
          onChange={() => props.toggleGeneration(1)}
          checked={props.generations[1].enabled}
        />
        <label htmlFor="gen2"> Gen 2 (GSC)</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="gen3"
          onChange={() => props.toggleGeneration(2)}
          checked={props.generations[2].enabled}
        />
        <label htmlFor="gen3"> Gen 3 (RSE)</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="gen4"
          onChange={() => props.toggleGeneration(3)}
          checked={props.generations[3].enabled}
        />
        <label htmlFor="gen4"> Gen 4 (DPPl)</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="gen5"
          onChange={() => props.toggleGeneration(4)}
          checked={props.generations[4].enabled}
        />
        <label htmlFor="gen5"> Gen 5 (BW/BW2)</label>
      </div>

      <div className="checkbox">
        <input
          type="checkbox"
          id="gen6"
          onChange={() => props.toggleGeneration(5)}
          checked={props.generations[5].enabled}
        />
        <label htmlFor="gen6"> Gen 6 (XY)</label>
      </div>

      <div className="checkbox">
        {" "}
        <input
          type="checkbox"
          id="gen7"
          onChange={() => props.toggleGeneration(6)}
          checked={props.generations[6].enabled}
        />
        <label htmlFor="gen7"> Gen 7 (SM/USUM)</label>
      </div>

      <div className="checkbox">
        {" "}
        <input
          type="checkbox"
          id="gen8"
          onChange={() => props.toggleGeneration(7)}
          checked={props.generations[7].enabled}
        />
        <label htmlFor="gen8"> Gen 8 (SwSh)</label>
      </div>
    </div>
  );
};

export default memo(GenerationInput);
