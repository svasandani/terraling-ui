import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import RangeInput from "../../shared/RangeInput";
import Divider from "../../shared/Divider";

import SimilarityGraph from "../visualizers/SimilarityGraph";
import SimilarityTree from "../visualizers/SimilarityTree";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";
import CheckboxInput from "../../shared/CheckboxInput";

const SimilarityGraphResultsInner = ({ data, resultData, accessor }) => {
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

function SimilarityGraphResults({ data, resultData }) {
  switch (resultData.on) {
    case "lings":
      return (
        <SimilarityGraphResultsInner
          data={data}
          resultData={resultData}
          accessor="lings"
        />
      );
    case "linglets":
      return (
        <SimilarityGraphResultsInner
          data={data}
          resultData={resultData}
          accessor="linglets"
        />
      );
    default:
      return <Redirect to="new" />;
  }
}

const SimilarityTreeResultsInner = ({ data, resultData, accessor }) => {
  let treeData = {
    branchset: [
      {
        branchset: [
          {
            branchset: [
              {
                branchset: [
                  {
                    length: 1,
                    name: "Abaza",
                  },
                  {
                    length: 1,
                    name: "Abdiji",
                  },
                ],
                length: 0,
                name: "",
              },
              {
                branchset: [
                  {
                    length: 1,
                    name: "Acehnese",
                  },
                  {
                    length: 1,
                    name: "Agni (Bini)",
                  },
                ],
                length: 0,
                name: "",
              },
            ],
            length: 0,
            name: "",
          },
          {
            branchset: [
              {
                branchset: [
                  {
                    length: 1,
                    name: "Abaza",
                  },
                  {
                    length: 1,
                    name: "Abdiji",
                  },
                ],
                length: 0,
                name: "",
              },
              {
                branchset: [
                  {
                    length: 1,
                    name: "Acehnese",
                  },
                  {
                    length: 1,
                    name: "Agni (Bini)",
                  },
                ],
                length: 0,
                name: "",
              },
            ],
            length: 0,
            name: "",
          },
        ],
        length: 0,
        name: "",
      },
      {
        branchset: [
          {
            branchset: [
              {
                branchset: [
                  {
                    length: 1,
                    name: "Abaza",
                  },
                  {
                    length: 1,
                    name: "Abdiji",
                  },
                ],
                length: 0,
                name: "",
              },
              {
                branchset: [
                  {
                    length: 1,
                    name: "Acehnese",
                  },
                  {
                    length: 1,
                    name: "Agni (Bini)",
                  },
                ],
                length: 0,
                name: "",
              },
            ],
            length: 0,
            name: "",
          },
          {
            branchset: [
              {
                branchset: [
                  {
                    length: 1,
                    name: "Abaza",
                  },
                  {
                    length: 1,
                    name: "Abdiji",
                  },
                ],
                length: 0,
                name: "",
              },
              {
                branchset: [
                  {
                    length: 1,
                    name: "Acehnese",
                  },
                  {
                    length: 1,
                    name: "Agni (Bini)",
                  },
                ],
                length: 0,
                name: "",
              },
            ],
            length: 0,
            name: "",
          },
        ],
        length: 0,
        name: "",
      },
    ],
    length: 0,
    name: "",
  };
  const lingMap = new Map();

  resultData.pairs
    .sort((a, b) => b.common_property_values - a.common_property_values)
    .forEach((pair) => {
      const hasLingZero = lingMap.has(pair[accessor][0]);
      const hasLingOne = lingMap.has(pair[accessor][1]);

      if (hasLingZero && !hasLingOne) {
      } else if (hasLingOne && !hasLingZero) {
      } else if (hasLingZero && hasLingOne) {
      } else {
      }
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
          <h2>Similarity Tree</h2>
          <SimilarityTree data={treeData} />
        </>
      )}
    </>
  );
};

function SimilarityTreeResults({ data, resultData }) {
  switch (resultData.on) {
    case "lings":
      return (
        <SimilarityTreeResultsInner
          data={data}
          resultData={resultData}
          accessor="lings"
        />
      );
    case "linglets":
      return (
        <SimilarityTreeResultsInner
          data={data}
          resultData={resultData}
          accessor="linglets"
        />
      );
    default:
      return <Redirect to="new" />;
  }
}

function SimilarityResults({ data, resultData }) {
  return <SimilarityTreeResults data={data} resultData={resultData} />;
}

export default SimilarityResults;
