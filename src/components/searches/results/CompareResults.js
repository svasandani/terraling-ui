import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import HeadingTable from "../../shared/HeadingTable";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";

const CompareResultsInner = ({ data, resultData, nameSort, accessor }) => {
  const distinctData = resultData.distinct.map((row) => {
    row[`${accessor}_value_pairs`].forEach((pair) => {
      row[pair.name] = pair.value;
    });

    return row;
  });

  const diffColumnMap = { name: "Property" };
  resultData[`${accessor}s`].forEach((ling) => {
    diffColumnMap[ling] = ling;
  });

  return (
    <>
      <h1>
        Comparing {resultData[`${accessor}s`].length}{" "}
        {CapitalCase(
          TargetToPlural(
            resultData[`${accessor}s`].length,
            data.overviewData[`ling${accessor === "ling" ? "0" : "1"}_name`]
          )
        )}
        : {resultData[`${accessor}s`].join(", ")}
      </h1>
      {resultData.common.length === 0 && resultData.distinct.length === 0 ? (
        <>
          <h2>No results found!</h2>
          <Link to="new">Try again?</Link>
        </>
      ) : (
        <>
          {resultData.common.length > 0 ? (
            <>
              <h2>Common Property Values</h2>
              <HeadingTable
                data={resultData.common}
                sort={nameSort}
                link={(_, id) => {
                  return "/groups/" + data.id + "/properties/" + id;
                }}
                columnMap={{ name: "Property", value: "Common Value" }}
              />
            </>
          ) : null}
          {resultData.distinct.length > 0 ? (
            <>
              <h2>Distinct Property Values</h2>
              <HeadingTable
                data={distinctData}
                sort={nameSort}
                link={(_, id) => {
                  return "/groups/" + data.id + "/properties/" + id;
                }}
                columnMap={diffColumnMap}
              />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

function CompareResults({ data, resultData }) {
  const nameSort = (a, b) => {
    return a.name > b.name ? 1 : -1;
  };

  switch (resultData.on) {
    case "lings":
      return (
        <CompareResultsInner
          data={data}
          resultData={resultData}
          nameSort={nameSort}
          accessor="ling"
        />
      );
    case "linglets":
      return (
        <CompareResultsInner
          data={data}
          resultData={resultData}
          nameSort={nameSort}
          accessor="linglet"
        />
      );
    default:
      return <Redirect to="new" />;
  }
}

export default CompareResults;
