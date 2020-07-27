import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

function CrossResults({ data, resultData }) {
  let parent = resultData.rows[0].parent;
  let num = parent.length;
  let depth = parent[0].lings_property.ling.depth;

  let lingProperties = parent.reduce((arr, p) => { arr.push(p.lings_property.property.name); return arr; }, []);

  const countSort = (a, b) => { return a.count < b.count ? 1 : -1; }
  const nameSort = (a, b) => { return a.name > b.name ? 1 : -1; }

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

  let columnMap = {};
  for ( let i = 0; i < num; i++ ) {
    columnMap["property_" + i] = resultData.header.cross_property;
    columnMap["value_" + i] = resultData.header.cross_value;
  }
  columnMap["count"] = resultData.header.count;

  let mappedData = resultData.rows.reduce((arr, row) => {
    let rowObj = {};

    for ( let i = 0; i < num; i++ ) {
      rowObj["property_" + i] = row.parent[i].lings_property.property.name;
      rowObj["value_" + i] = row.parent[i].lings_property.value;
    }

    rowObj["count"] = row.child.length;
    rowObj["id"] = row.child.length;
    rowObj["children"] = row.child.reduce((childArr, c) => {
      childArr.push(c.lings_property.ling.name.trim());

      return childArr;
    }, []);

    arr.push(rowObj);

    return arr;
  }, [])

  return (
    <>
      <h1>Crossing {num} {CapitalCase(depth > 0 ? data.overviewData.ling1_name : data.overviewData.ling0_name)} Properties: {lingProperties.join(", ")}</h1>
      <h2>Different Property Values</h2>
      <HeadingTable data={mappedData} sort={countSort} link={(url, id) => { return "./results"; }} linkColumn="count" clickHandler={(e, row) => { e.preventDefault(); setPropertyArr(row.children.reduce((arr, c) => { arr.push({ name: c }); return arr; }, [])); }} columnMap={columnMap} />
      {
        propertyArr.length === 0 ?
        (
          null
        ) :
        (
          <>
            <h2 id="lings-in-row">{CapitalCase(TargetToPlural(2, depth > 0 ? data.overviewData.ling1_name : data.overviewData.ling0_name))} in this row <Link className="reset-btn" to="#container" onClick={(e) => setPropertyArr([])}>Hide</Link></h2>
            <HeadingTable data={propertyArr} link={(url, id) => { return "./results"; }} linkColumn="none" sort={nameSort} columnMap={{ "name": "Name" }} />
          </>
        )
      }
    </>
  )
}

export default CrossResults;
