import React from "react";

import "../../css/shared/RangeInput.css";

function RangeInput({ min = 0, max = 100, value, setValue }) {
  return (
    <>
      <div className="rangeinput">
        <div className="ranges">
          <span className="min">{min}</span>
          <span className="max">{max}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default RangeInput;
