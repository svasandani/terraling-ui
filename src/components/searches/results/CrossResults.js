import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

const CrossLingPropertyResults = ({ data, resultData, nameSort, countSort }) => {
  const mappedData = resultData.property_combinations.map(row => {
    const newRow = {};

    row.property_value_pairs.forEach(pair => {
      newRow[pair.name] = pair.value;
    })
    newRow.count = row.lings.length;
    newRow.lings = row.lings;

    return newRow;
  })

  const columnMap = {}
  resultData.ling_properties.forEach(property => {
    columnMap[property] = `${property} Value`;
  })
  columnMap.count = 'Count';

  const [propertyArr, setPropertyArr] = useState([]);

  useEffect(() => {
    if (propertyArr.length > 0) {
      let el = document.querySelector("#lings-in-row");

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        setPropertyArr(propertyArr);
      }
    }
  }, [propertyArr])

  return (
    <>
      <h1>Crossing {resultData.ling_properties.length} {CapitalCase(data.overviewData.ling0_name)} Properties: {resultData.ling_properties.join(", ")}</h1>
      <h2>Results</h2>
      <HeadingTable 
        data={mappedData} 
        sort={countSort} link={(_, __) => { return "./results"; }} 
        linkColumn="count" 
        clickHandler={(e, row) => { e.preventDefault(); setPropertyArr(row.lings.map(l => { return { name: l } })); }} 
        columnMap={columnMap} 
      />
      {
        propertyArr.length === 0 ?
        (
          null
        ) :
        (
          <>
            <h2 id="lings-in-row">{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} in this row <Link className="reset-btn" to="#container" onClick={(e) => setPropertyArr([])}>Hide</Link></h2>
            <HeadingTable data={propertyArr} link={(url, id) => { return "./results"; }} linkColumn="none" sort={nameSort} columnMap={{ "name": "Name" }} />
          </>
        )
      }
    </>
  )
}

function CrossResults({ data, resultData }) {

  const countSort = (a, b) => { return a.count < b.count ? 1 : -1; }
  const nameSort = (a, b) => { return a.name > b.name ? 1 : -1; }

  switch(resultData.on) {
    case "ling_properties": return <CrossLingPropertyResults data={data} resultData={resultData} nameSort={nameSort} countSort={countSort} />
  }
}

export default CrossResults;
