import React from 'react';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

function CompareResults({ data, resultData }) {
  let lings = resultData.rows[0].lings;
  let num = lings.length;
  let depth = lings[0].depth;

  lings = lings.reduce((arr, ling) => { arr.push(ling.name); return arr; }, []);

  const idSort = (a, b) => { return a.id > b.id ? 1 : -1; }

  let diffColumnMap = { name: resultData.header.differents.compare_property };
  resultData.header.differents.ling_value.forEach((value, i) => {
    diffColumnMap["value_" + i] = value;
  });

  let separatedData = resultData.rows.reduce((arr, row) => {
    if (row.child.length > 1) {
      let diffObj = { name: row.parent[0].property.name, id: row.parent[0].property.id };

      for ( let i = 0; i < num; i++ ) {
        diffObj["value_" + i] = row.child[i] === null ? "" : row.child[i].value;
      }

      arr.differents.push(diffObj);
    } else {
      arr.commons.push({ name: row.parent[0].property.name, id: row.parent[0].property.id, value: row.child[0].value });
    }

    return arr;
  }, { commons: [], differents: [] })

  return (
    <>
      <h1>Comparing {num} {CapitalCase(TargetToPlural(2, (depth > 0 ? data.overviewData.ling1_name : data.overviewData.ling0_name)))}: {lings.join(", ")}</h1>
      {
        Object.keys(resultData.header.commons).length > 0 ?
        (
          <>
            <h2>Common Property Values</h2>
            <HeadingTable data={separatedData.commons} sort={idSort} link={(url, id) => { return "/groups/" + data.id + "/properties/" + id; }} columnMap={{ "name": resultData.header.commons.compare_property, "value": resultData.header.commons.common_values }} />
          </>
        ) :
        (
          null
        )
      }
      {
        Object.keys(resultData.header.differents).length > 0 ?
        (
          <>
            <h2>Different Property Values</h2>
            <HeadingTable data={separatedData.differents} sort={idSort} link={(url, id) => { return "/groups/" + data.id + "/properties/" + id; }} columnMap={diffColumnMap} />
          </>
        ) :
        (
          null
        )
      }
    </>
  )
}

export default CompareResults;
