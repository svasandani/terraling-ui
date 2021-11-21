import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import HeadingTable from '../../shared/HeadingTable';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

const FilterLingResults = ({data, resultData, nameSort}) => {
  return (
    <>
      <h1>Filter Search</h1>
      <h2>Results</h2>
      {
        resultData.lings.sort(nameSort).map((ling, i) => {
          return (
            <div key={i} className="grouped-card">
              <h3><Link to={`/groups/${data.id}/lings/${ling.id}`}>{ling.name}</Link></h3>
              <HeadingTable data={ling.property_value_pairs} sort={nameSort} linkColumn="" columnMap={{name: 'Property', value: 'Value'}} />
            </div>
          )
        })
      }
    </>
  )
}
const FilterLingPropertyResults = ({data, resultData, nameSort}) => {
  return (
    <>
      <h1>Filter Search</h1>
      <h2>Results</h2>
      {
        resultData.properties.sort(nameSort).map((property, i) => {
          return (
            <div key={i} className="grouped-card">
              <h3><Link to={`/groups/${data.id}/properties/${property.id}`}>{property.name}</Link></h3>
              <HeadingTable data={property.ling_value_pairs} sort={nameSort} linkColumn="" columnMap={{name: CapitalCase(data.overviewData.ling0_name), value: 'Value'}} />
            </div>
          )
        })
      }
    </>
  )
}
const FilterLingletResults = ({data, resultData, nameSort}) => {
  return (
    <>
      <h1>Filter Search</h1>
      <h2>Results</h2>
      {
        resultData.lings.sort(nameSort).map((ling, i) => {
          return (
            <div key={i} className="grouped-card">
              <h3><Link to={`/groups/${data.id}/lings/${ling.id}`}>{ling.name}</Link></h3>
              {
                ling.linglets.sort(nameSort).map((linglet, j) => {
                  return(
                    <div key={j} className="grouped-card">
                      <h4><Link to={`/groups/${data.id}/lings/${linglet.id}`}>{linglet.name}</Link></h4>
                      <HeadingTable data={linglet.property_value_pairs} sort={nameSort} linkColumn="" columnMap={{name: 'Property', value: 'Value'}} />
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </>
  )
}
const FilterLingletPropertyResults = ({data, resultData, nameSort}) => {
  return (
    <>
      <h1>Filter Search</h1>
      <h2>Results</h2>
      {
        resultData.properties.sort(nameSort).map((property, i) => {
          return (
            <div key={i} className="grouped-card">
              <h3><Link to={`/groups/${data.id}/properties/${property.id}`}>{property.name}</Link></h3>
              <HeadingTable data={property.linglet_value_pairs} sort={nameSort} linkColumn="" columnMap={{name: CapitalCase(data.overviewData.ling1_name), value: 'Value'}} />
            </div>
          )
        })
      }
    </>
  )
}

function FilterResults({ data, resultData }) {
  const nameSort = (a, b) => { return a.name > b.name ? 1 : -1; }

  switch(resultData.on) {
    case "lings": return <FilterLingResults data={data} resultData={resultData} nameSort={nameSort} />;
    case "ling_properties": return <FilterLingPropertyResults data={data} resultData={resultData} nameSort={nameSort} />;
    case "linglets": return <FilterLingletResults data={data} resultData={resultData} nameSort={nameSort} />;
    case "linglet_properties": return <FilterLingletPropertyResults data={data} resultData={resultData} nameSort={nameSort} />;
    default: return <Redirect to="new" />;
  }
}

export default FilterResults;
