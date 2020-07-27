import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../shared/SelectTable';

import CompareSearch from './types/CompareSearch';
import CrossSearch from './types/CrossSearch';

import '../../css/searches/SearchForm.css';

function SearchForm({ data, searchPath, searchData, setSearchData }) {
  let match = useRouteMatch();

  const [searchTypesArr, setSearchTypesArr] = useState([]);

  const reset = (e, f) => {
    e.preventDefault();
    f([]);
  }

  const searchTypes = [{"name": "Regular", "id": "regular"}, {"name": "Compare", "id": "compare"}, {"name": "Cross", "id": "cross"}, {"name": "Implication", "id": "implication"}, {"name": "Similarity Tree", "id": "similarity"}];

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefType = {};
    let oldid = ""

    if (searchTypesArr.length === 1) {
      oldid = searchTypesArr[0].id;
    }

    searchTypes.forEach(type => {
      if (window.location.href.includes(type.id)) {
        contains = true;
        if (oldid !== type.id) {
          isNew = true;
          hrefType = type;
        }
      }
    })

    if (isNew) setSearchTypesArr([hrefType]);
    else if (!contains && searchTypesArr.length > 0) setSearchTypesArr([]);

    if (Object.keys(searchData).length > 0) setSearchData({});
  }, [window.location.href, searchTypesArr, searchData]);

  return (
    <>
      <h1>Search</h1>
      <h2>Search type</h2>
      <SelectTable data={searchTypes} columnMap={["name"]} selectArr={searchTypesArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTypesArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
        <Switch>
          <Route path={`${match.path}/regular`}>
            <div />
          </Route>
          <Route path={`${match.path}/compare`}>
            <CompareSearch data={data} reset={reset} setSearchData={setSearchData} searchPath={searchPath} />
          </Route>
          <Route path={`${match.path}/cross`}>
            <CrossSearch data={data} reset={reset} setSearchData={setSearchData} searchPath={searchPath} />
          </Route>
          <Route path={`${match.path}/implication`}>
            <div />
          </Route>
          <Route path={`${match.path}/similarity`}>
            <div />
          </Route>
        </Switch>
    </>
  )
}

export default SearchForm;
