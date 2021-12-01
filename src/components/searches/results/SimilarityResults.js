import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import RangeInput from "../../shared/RangeInput";
import Divider from "../../shared/Divider";
import SelectTable from "../../shared/SelectTable";

import SimilarityGraph from "../visualizers/SimilarityGraph";
import SimilarityTree from "../visualizers/SimilarityTree";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";
import CheckboxInput from "../../shared/CheckboxInput";
import { filter } from "d3-array";

const SimilarityGraphResultsInner = ({
  data,
  resultData,
  accessor,
  max,
  filterThreshold,
  showLonely,
}) => {
  const lonelyMap = new Map();
  const links = resultData.pairs
    .filter((p) => p.common_property_values > filterThreshold)
    .map((pair) => {
      lonelyMap.set(pair[accessor][0], 1);
      lonelyMap.set(pair[accessor][1], 1);
      return {
        source: pair[accessor][0],
        target: pair[accessor][1],
        value: parseInt(pair.common_property_values),
      };
    });
  const nodes = resultData[accessor]
    .filter((l) => showLonely || lonelyMap.has(l))
    .map((lingName) => {
      return { id: lingName };
    });

  return (
    <>
      <h1>
        Plotting similarity for {resultData[accessor].length}{" "}
        {CapitalCase(
          TargetToPlural(
            resultData[accessor].length,
            data.overviewData[`ling${accessor === "lings" ? "0" : "1"}_name`]
          )
        )}
        {resultData[accessor].length <= 6
          ? `: ${resultData[accessor].join(", ")}`
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
        </>
      )}
    </>
  );
};

function SimilarityGraphResults({
  data,
  resultData,
  max,
  filterThreshold,
  showLonely,
}) {
  switch (resultData.on) {
    case "lings":
      return (
        <SimilarityGraphResultsInner
          data={data}
          resultData={resultData}
          accessor="lings"
          max={max}
          filterThreshold={filterThreshold}
          showLonely={showLonely}
        />
      );
    case "linglets":
      return (
        <SimilarityGraphResultsInner
          data={data}
          resultData={resultData}
          accessor="linglets"
          max={max}
          filterThreshold={filterThreshold}
          showLonely={showLonely}
        />
      );
    default:
      return <Redirect to="new" />;
  }
}

const SimilarityTreeResultsInner = ({
  data,
  resultData,
  accessor,
  max,
  filterThreshold,
  showLonely,
}) => {
  let treeData = {};
  const lingMap = new Map();
  const containMap = new Map();

  resultData[accessor].forEach((ling) => {
    lingMap.set(ling, {
      name: ling,
      length: 1,
    });
    containMap.set(ling, [ling]);
  });

  const updateRoot = (ling1, ling2) => {
    const contain1 = containMap.get(ling1);
    const contain2 = containMap.get(ling2);
    if (contain1.includes(ling2) || contain2.includes(ling1)) {
      return;
    }

    const newRoot = {
      branchset: [lingMap.get(ling1), lingMap.get(ling2)],
      length: 0,
      name: "",
    };

    const contains = [...containMap.get(ling1), ...containMap.get(ling2)];

    lingMap.set(ling1, newRoot);
    lingMap.set(ling2, newRoot);
    containMap.set(ling1, contains);
    containMap.set(ling2, contains);

    contain1.forEach((ling) => {
      lingMap.set(ling, newRoot);
      containMap.set(ling, contains);
    });
    contain2.forEach((ling) => {
      lingMap.set(ling, newRoot);
      containMap.set(ling, contains);
    });

    treeData = newRoot;
  };

  resultData.pairs
    .filter((pair) => pair.common_property_values > filterThreshold)
    .sort((a, b) => b.common_property_values - a.common_property_values)
    .forEach((pair) => {
      updateRoot(pair[accessor][0], pair[accessor][1]);
    });

  if (
    !resultData[accessor].every((item) =>
      containMap.get(resultData[accessor][0]).includes(item)
    )
  ) {
    const distinctParts = new Map();

    for (const [ling, contains] of containMap) {
      if (
        (!showLonely && contains.length === 1) ||
        distinctParts.has(contains.sort().join(","))
      )
        continue;

      distinctParts.set(contains.sort().join(","), ling);
    }

    let lastLing = null;

    for (const [_, ling] of distinctParts) {
      if (lastLing !== null) {
        updateRoot(lastLing, ling);
      }

      lastLing = ling;
    }
  }

  return (
    <>
      <h1>
        Plotting similarity for {resultData[accessor].length}{" "}
        {CapitalCase(
          TargetToPlural(
            resultData[accessor].length,
            data.overviewData[`ling${accessor === "lings" ? "0" : "1"}_name`]
          )
        )}
        {resultData[accessor].length <= 6
          ? `: ${resultData[accessor].join(", ")}`
          : ""}
      </h1>
      {resultData.pairs.length === 0 ? (
        <>
          <h2>No pairs found!</h2>
          <Link to="new">Try again?</Link>
        </>
      ) : (
        <>
          <h2>Similarity Tree</h2>
          <SimilarityTree data={treeData} />
        </>
      )}
    </>
  );
};

function SimilarityTreeResults({
  data,
  resultData,
  max,
  filterThreshold,
  showLonely,
}) {
  switch (resultData.on) {
    case "lings":
      return (
        <SimilarityTreeResultsInner
          data={data}
          resultData={resultData}
          max={max}
          filterThreshold={filterThreshold}
          showLonely={showLonely}
          accessor="lings"
        />
      );
    case "linglets":
      return (
        <SimilarityTreeResultsInner
          data={data}
          resultData={resultData}
          max={max}
          filterThreshold={filterThreshold}
          showLonely={showLonely}
          accessor="linglets"
        />
      );
    default:
      return <Redirect to="new" />;
  }
}

function SimilarityResults({ data, resultData }) {
  const max = resultData.pairs.reduce(
    (a, c) => (a > c.common_property_values ? a : c.common_property_values),
    0
  );
  const [filterThreshold, setFilterThreshold] = React.useState(
    Math.floor((2 * max) / 3)
  );

  const showLonelies = [
    {
      name: `Show lonely points`,
      id: true,
    },
    {
      name: `Hide lonely points`,
      id: false,
    },
  ];
  const [showLonelyArr, setShowLonelyArr] = React.useState([
    {
      name: `Hide lonely points`,
      id: false,
    },
  ]);

  const visualizationTypes = [
    {
      name: `Similarity Graph`,
      id: "graph",
    },
    {
      name: `Similarity Tree`,
      id: "tree",
    },
  ];
  const [visualizationTypeArr, setVisualizationTypeArr] = React.useState([
    {
      name: `Similarity Graph`,
      id: "graph",
    },
  ]);

  return (
    <>
      {(() => {
        switch (visualizationTypeArr[0].id) {
          case "graph":
            return (
              <SimilarityGraphResults
                data={data}
                resultData={resultData}
                max={max}
                filterThreshold={filterThreshold}
                showLonely={showLonelyArr[0].id}
              />
            );
            break;
          case "tree":
            return (
              <SimilarityTreeResults
                data={data}
                resultData={resultData}
                max={max}
                filterThreshold={filterThreshold}
                showLonely={showLonelyArr[0].id}
              />
            );
            break;
          default:
            return (
              <SimilarityTreeResults
                data={data}
                resultData={resultData}
                max={max}
                filterThreshold={filterThreshold}
                showLonely={showLonelyArr[0].id}
              />
            );
        }
      })()}
      <Divider />
      <h2>Visualization Type</h2>
      <SelectTable
        data={visualizationTypes}
        columnMap={["name"]}
        selectArr={visualizationTypeArr}
        find={(el, row) => el.id === row.id}
        setSelectArr={setVisualizationTypeArr}
        maxSelect={1}
        replaceWithNew={true}
      />
      <h2>Visualization Options</h2>
      <h3>
        Showing connections with more than {filterThreshold} common property
        values
      </h3>
      <RangeInput
        min={0}
        max={max}
        value={filterThreshold}
        setValue={setFilterThreshold}
      />
      <br />
      <h3>Lonely points</h3>
      <SelectTable
        data={showLonelies}
        columnMap={["name"]}
        selectArr={showLonelyArr}
        find={(el, row) => el.id === row.id}
        setSelectArr={setShowLonelyArr}
        maxSelect={1}
        replaceWithNew={true}
      />
    </>
  );
}

export default SimilarityResults;
