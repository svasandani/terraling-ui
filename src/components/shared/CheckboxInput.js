import React from "react";

import "../../css/shared/CheckboxInput.css";

function CheckboxInput({ value, setValue }) {
  return (
    <>
      <div className="checkboxinput">
        <input
          type="checkbox"
          value={value}
          onChange={(e) => {
            setValue(e.target.checked);
          }}
        />
      </div>
    </>
  );
}

export default CheckboxInput;
