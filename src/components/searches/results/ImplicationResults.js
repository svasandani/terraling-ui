import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import HeadingTable from "../../shared/HeadingTable";

import { CapitalCase, TargetToPlural } from "../../helpers/Helpers";

function ImplicationResults({ data, resultData }) {
  const implicationSort = (a, b) => {
    return a.implication > b.implication ? 1 : -1;
  };

  const implicationData = resultData.implications.map((pair) => {
    const pairData = {
      id: pair.id,
      selected: `${resultData.property.name} = “${resultData.property.value}”`,
      operator: "",
      implication: `${pair.name} = “${pair.value}”`,
    };

    switch (resultData.direction) {
      case "antecedent":
        pairData.operator = "=>";
        break;
      case "consequent":
        pairData.operator = "=>";
        break;
      case "both":
        pairData.operator = "<=>";
        break;
    }

    return pairData;
  });

  let columnMap = {};
  switch (resultData.direction) {
    case "antecedent":
      columnMap = {
        selected: "Selected property",
        operator: "Implies",
        implication: "Implied property",
      };
      break;
    case "consequent":
      columnMap = {
        implication: "Other property",
        operator: "Implies",
        selected: "Selected (implied) property",
      };
      break;
    case "both":
      columnMap = {
        selected: "Selected property",
        operator: "If and only if",
        implication: "Other property",
      };
      break;
  }

  let heading = "";
  switch (resultData.direction) {
    case "antecedent":
      heading = "Showing properties implied by ";
      break;
    case "consequent":
      heading = "Showing properties that imply ";
      break;
    case "both":
      heading = "Showing properties that occur if and only if ";
      break;
  }

  return (
    <>
      <h1>
        {`${heading}${resultData.property.name} = “${resultData.property.value}”`}
      </h1>
      {resultData.implications.length === 0 ? (
        <>
          <h2>No results found!</h2>
          <Link to="new">Try again?</Link>
        </>
      ) : (
        <>
          <h2>Implications</h2>
          <HeadingTable
            data={implicationData}
            sort={implicationSort}
            link={(_, id) => {
              return "/groups/" + data.id + "/properties/" + id;
            }}
            linkColumn="implication"
            columnMap={columnMap}
          />
        </>
      )}
    </>
  );
}

export default ImplicationResults;
