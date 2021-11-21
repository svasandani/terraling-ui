import React from 'react';
import { Link } from 'react-router-dom';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

const FilterLingResults = ({data, resultData}) => {
  const nameSort = (a, b) => { return a.name > b.name ? 1 : -1; }
  
  return (
    <>
      <h1>Filter Search</h1>
      <h2>Results</h2>
      {
        resultData.lings.map((ling, i) => {
          return (
            <div key={i} className="grouped-card">
              <h3><Link to={`/groups/${data.id}/lings/${ling.id}`}>{ling.name}</Link></h3>
              <HeadingTable data={ling.property_value_pairs} sort={nameSort} linkColumn="" columnMap={{name: 'Properties', value: 'Value'}} />
            </div>
          )
        })
      }
    </>
  )
}

function FilterResults({ data, resultData }) {
  return (
    <>
      {/* <h1>Filter Search</h1>
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
      } */}
      <FilterLingResults data={data} resultData={resultData} />
    </>
  )
}

export default FilterResults;
