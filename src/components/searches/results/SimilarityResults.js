import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import SimilarityGraph from "../visualizers/SimilarityGraph";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";

const SimilarityLingResults = ({ data, resultData }) => {
  const [filterThreshold, setFilterThreshold] = React.useState(80);

  const nodes = resultData.lings.map((lingName) => {
    return { id: lingName };
  });
  const links = resultData.pairs
    .filter((p) => p.common_property_values > filterThreshold)
    .map((pair) => {
      return {
        source: pair.lings[0],
        target: pair.lings[1],
        value: parseInt(pair.common_property_values),
      };
    });

  return (
    <>
      <h1>
        Plotting similarity for {resultData.lings.length}{" "}
        {CapitalCase(
          TargetToPlural(resultData.lings.length, data.overviewData.ling0_name)
        )}
        : {resultData.lings.join(", ")}
      </h1>
      {resultData.pairs.length === 0 ? (
        <>
          <h2>No pairs found!</h2>
          <Link to="new">Try again?</Link>
        </>
      ) : (
        <>
          <h2>Similarity Graph</h2>
          <SimilarityGraph nodes={nodes} links={links} />
          <input
            type="range"
            min="0"
            max={links.reduce((a, c) => (a > c.value ? a : c.value), 0)}
            value={filterThreshold}
            onChange={(e) => {
              setFilterThreshold(e.target.value);
            }}
          />
        </>
      )}
    </>
  );
};

function SimilarityResults({ data, resultData }) {
  switch (resultData.on) {
    case "lings":
      return <SimilarityLingResults data={data} resultData={resultData} />;
    default:
      return <Redirect to="new" />;
  }
}

export default SimilarityResults;
