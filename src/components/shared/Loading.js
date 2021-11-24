import React from "react";

import "../../css/shared/Loading.css";
import loading from "../../img/loading.svg";

function Loading() {
  const headingChoices = ["Hold on", "Please wait", "One moment", "Just a sec"];
  let headingIndex = Math.floor(Math.random() * 4);

  const textChoices = [
    "We're crunching the numbers.",
    "We're fetching your data.",
    "We're working our magic.",
    "We'll be ready shortly.",
  ];
  let textIndex = Math.floor(Math.random() * 4);

  return (
    <div className="loading">
      <h1 className="ellipsis">{headingChoices[headingIndex]}</h1>
      <img src={loading} alt="A person turning several gears." />
      <h2>{textChoices[textIndex]}</h2>
    </div>
  );
}

export default Loading;
