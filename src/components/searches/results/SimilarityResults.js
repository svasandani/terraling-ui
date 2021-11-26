import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import RangeInput from "../../shared/RangeInput";
import Divider from "../../shared/Divider";

import SimilarityGraph from "../visualizers/SimilarityGraph";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";
import CheckboxInput from "../../shared/CheckboxInput";

const SimilarityLingResults = ({ data, resultData }) => {
  const max = resultData.pairs.reduce(
    (a, c) => (a > c.common_property_values ? a : c.common_property_values),
    0
  );
  const [filterThreshold, setFilterThreshold] = React.useState(
    Math.floor(max / 2)
  );
  const [showLonely, setShowLonely] = React.useState(false);

  const lonelyMap = new Map();
  const links = resultData.pairs
    .filter((p) => p.common_property_values > filterThreshold)
    .map((pair) => {
      lonelyMap.set(pair.lings[0], 1);
      lonelyMap.set(pair.lings[1], 1);
      return {
        source: pair.lings[0],
        target: pair.lings[1],
        value: parseInt(pair.common_property_values),
      };
    });
  const nodes = resultData.lings
    .filter((l) => showLonely || lonelyMap.has(l))
    .map((lingName) => {
      return { id: lingName };
    });

  return (
    <>
      <h1>
        Plotting similarity for {resultData.lings.length}{" "}
        {CapitalCase(
          TargetToPlural(resultData.lings.length, data.overviewData.ling0_name)
        )}
        {resultData.lings.length <= 6 ? `: ${resultData.lings.join(", ")}` : ""}
      </h1>
      {resultData.pairs.length === 0 ? (
        <>
          <h2>No pairs found!</h2>
          <Link to="new">Try again?</Link>
        </>
      ) : (
        <>
          <h2>Similarity Graph (click and drag to reposition)</h2>
          <SimilarityGraph nodes={nodes} links={links} />
          <Divider />
          <h2>
            Showing connections with more than {filterThreshold} common property
            values
          </h2>
          <RangeInput
            min="0"
            max={links.reduce((a, c) => (a > c.value ? a : c.value), 0)}
            value={filterThreshold}
            setValue={setFilterThreshold}
          />
          <br />
          <h2>Show points with no common values?</h2>
          <CheckboxInput value={showLonely} setValue={setShowLonely} />
        </>
      )}
    </>
  );
};
const SimilarityLingletResults = ({ data, resultData }) => {
  const max = resultData.pairs.reduce(
    (a, c) => (a > c.common_property_values ? a : c.common_property_values),
    0
  );
  const [filterThreshold, setFilterThreshold] = React.useState(
    Math.floor(max / 2)
  );
  const [showLonely, setShowLonely] = React.useState(false);

  const lonelyMap = new Map();
  const links = resultData.pairs
    .filter((p) => p.common_property_values > filterThreshold)
    .map((pair) => {
      lonelyMap.set(pair.linglets[0], 1);
      lonelyMap.set(pair.linglets[1], 1);
      return {
        source: pair.linglets[0],
        target: pair.linglets[1],
        value: parseInt(pair.common_property_values),
      };
    });
  const nodes = resultData.linglets
    .filter((l) => showLonely || lonelyMap.has(l))
    .map((lingletName) => {
      return { id: lingletName };
    });

  return (
    <>
      <h1>
        Plotting similarity for {resultData.linglets.length}{" "}
        {CapitalCase(
          TargetToPlural(
            resultData.linglets.length,
            data.overviewData.ling1_name
          )
        )}
        {resultData.linglets.length <= 6
          ? `: ${resultData.linglets.join(", ")}`
          : ""}
      </h1>
      {resultData.pairs.length === 0 ? (
        <>
          <h2>No pairs found!</h2>
          <Link to="new">Try again?</Link>
        </>
      ) : (
        <>
          <h2>Similarity Graph (click and drag to reposition)</h2>
          <SimilarityGraph nodes={nodes} links={links} />
          <Divider />
          <h2>
            Showing connections with more than {filterThreshold} common property
            values
          </h2>
          <RangeInput
            min="0"
            max={links.reduce((a, c) => (a > c.value ? a : c.value), 0)}
            value={filterThreshold}
            setValue={setFilterThreshold}
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
    case "linglets":
      return <SimilarityLingletResults data={data} resultData={resultData} />;
    default:
      return <Redirect to="new" />;
  }
}

export default SimilarityResults;
