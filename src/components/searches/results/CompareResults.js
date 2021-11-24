import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

const CompareLingResults = ({ data, resultData, nameSort }) => {
  const distinctData = resultData.distinct.map(row => {
    row.ling_value_pairs.forEach(pair => {
      row[pair.name] = pair.value
    });

    return row;
  });

  const diffColumnMap = { name: "Property" };
  resultData.lings.forEach(ling => {
    diffColumnMap[ling] = ling;
  })

  return (
    <>
      <h1>Comparing {resultData.lings.length} {CapitalCase(TargetToPlural(resultData.lings.length, (data.overviewData.ling0_name)))}: {resultData.lings.join(", ")}</h1>
      {
        resultData.common.length === 0 && resultData.distinct.length === 0 ? 
        (
          <>
            <h2>No results found!</h2>
            <Link to='new'>Try again?</Link>
          </>
        ) :
        (
          <>
            {
              resultData.common.length > 0 ?
              (
                <>
                  <h2>Common Property Values</h2>
                  <HeadingTable data={resultData.common} sort={nameSort} link={(_, id) => { return "/groups/" + data.id + "/properties/" + id; }} columnMap={{ name: "Property", value: "Common Value" }} />
                </>
              ) :
              (
                null
              )
            }
            {
              resultData.distinct.length > 0 ?
              (
                <>
                  <h2>Distinct Property Values</h2>
                  <HeadingTable data={distinctData} sort={nameSort} link={(_, id) => { return "/groups/" + data.id + "/properties/" + id; }} columnMap={diffColumnMap} />
                </>
              ) :
              (
                null
              )
            }
          </>
        )
      }
    </>
  )
}
const CompareLingletResults = ({ data, resultData, nameSort }) => {
  const distincData = resultData.distinct.map(row => {
    row.linglet_value_pairs.forEach(pair => {
      row[pair.name] = pair.value
    });

    return row;
  });

  const diffColumnMap = { name: "Property" };
  resultData.linglets.forEach(linglet => {
    diffColumnMap[linglet] = linglet;
  })

  return (
    <>
      <h1>Comparing {resultData.linglets.length} {CapitalCase(TargetToPlural(resultData.linglets.length, (data.overviewData.ling1_name)))}: {resultData.linglets.join(", ")}</h1>
      {
        resultData.common.length === 0 && resultData.distinct.length === 0 ? 
        (
          <>
            <h2>No results found!</h2>
            <Link to='new'>Try again?</Link>
          </>
        ) :
        (
          <>
            {
              resultData.common.length > 0 ?
              (
                <>
                  <h2>Common Property Values</h2>
                  <HeadingTable data={resultData.common} sort={nameSort} link={(_, id) => { return "/groups/" + data.id + "/properties/" + id; }} columnMap={{ name: "Property", value: "Common Value" }} />
                </>
              ) :
              (
                null
              )
            }
            {
              resultData.distinct.length > 0 ?
              (
                <>
                  <h2>Distinct Property Values</h2>
                  <HeadingTable data={distincData} sort={nameSort} link={(_, id) => { return "/groups/" + data.id + "/properties/" + id; }} columnMap={diffColumnMap} />
                </>
              ) :
              (
                null
              )
            }
          </>
        )
      }
    </>
  )
}

function CompareResults({ data, resultData }) {
  const nameSort = (a, b) => { return a.name > b.name ? 1 : -1; };

  switch(resultData.on) {
    case "lings": return <CompareLingResults data={data} resultData={resultData} nameSort={nameSort} />;
    case "linglets": return <CompareLingletResults data={data} resultData={resultData} nameSort={nameSort} />;
    default: return <Redirect to="new" />;
  }
}

export default CompareResults;
