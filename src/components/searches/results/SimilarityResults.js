import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import HeadingTable from "../../shared/HeadingTable";

import SimilarityGraph from "../visualizers/SimilarityGraph";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";

const SimilarityLingResults = ({ data, resultData, nameSort }) => {
  const nodes = resultData.lings.map((lingName) => {
    return { id: lingName };
  });
  const links = resultData.pairs.map((pair) => {
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
        </>
      )}
    </>
  );
};

function SimilarityResults({ data, resultData }) {
  const nameSort = (a, b) => {
    return a.name > b.name ? 1 : -1;
  };

  switch (resultData.on) {
    case "lings":
      return (
        <SimilarityLingResults
          data={data}
          resultData={resultData}
          nameSort={nameSort}
        />
      );
    default:
      return <Redirect to="new" />;
  }
}

export default SimilarityResults;
