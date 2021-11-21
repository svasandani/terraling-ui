import React from 'react';
import { Link } from 'react-router-dom';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

function FilterResults({ data, resultData }) {
  const nameSort = (a, b) => { return a.name > b.name ? 1 : -1; }

  let columnMap = {};
  Object.keys(resultData.header).forEach(key => {
    if (key === "ling_0") return;

    if (key.includes("id")) return;
    if (key.includes("example")) return;

    columnMap[key] = resultData.header[key];
  });

  let mappedData = resultData.rows.reduce((obj, row) => {
    let ling_name = row.parent.lings_property.ling.name;

    let rowObj = {};

    if (columnMap.property_0 !== undefined) {
      rowObj.property_0 = row.parent.lings_property.property.name;
    }
    if (columnMap.value_0 !== undefined) {
      rowObj.value_0 = row.parent.lings_property.value;
    }
    if (columnMap.ling_1 !== undefined) {
      rowObj.ling_1 = row.child.lings_property.ling.name;
    }
    if (columnMap.property_1 !== undefined) {
      rowObj.property_1 = row.child.lings_property.property.name;
    }
    if (columnMap.value_1 !== undefined) {
      rowObj.value_1 = row.child.lings_property.value;
    }

    if (obj[ling_name] === undefined) {
      obj[ling_name] = [rowObj];
    } else {
      obj[ling_name].push(rowObj);
    }

    return obj;
  }, {})

  return (
    <>
      <h1>Regular Search</h1>
      <h2>Results</h2>
      {
        Object.keys(mappedData).map((ling, i) => {
          return (
            <div key={i} className="grouped-card">
              <h3>{ling}</h3>
              <HeadingTable data={mappedData[ling]} sort={nameSort} linkColumn="" columnMap={columnMap} />
            </div>
          )
        })
      }
    </>
  )
}

export default FilterResults;
