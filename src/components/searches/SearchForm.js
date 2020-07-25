import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../shared/SelectTable';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function SearchForm({ data }) {
  let match = useRouteMatch();

  const [selectArr, setSelectArr] = useState([]);
  const [searchTypesArr, setSearchTypesArr] = useState([]);
  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  const searchTypes = [{"name": "Any", "id": "any"}, {"name": "Compare", "id": "compare"}, {"name": "Cross", "id": "cross"}]
  const searchTargets = [{"name": CapitalCase(TargetToPlural(2, data.overviewData.ling0_name)), "id": "lings"}, {"name": "Properties", "id": "properties"}]

  useEffect(() => {
    let contains = false;
    let hrefType = {};
    let oldid = ""

    if (searchTypesArr.length === 1) {
      oldid = searchTypesArr[0].id;
    }

    searchTypes.forEach(type => {
      if (window.location.href.includes(type.id)) {
        if (oldid !== type.id) {
          contains = true;
          hrefType = type;
        }
      }
    })

    if (contains) setSearchTypesArr([hrefType]);

    contains = false;
    let hrefTarget = {};
    oldid = ""

    if (searchTargetsArr.length === 1) {
      oldid = searchTargetsArr[0].id;
    }

    searchTargets.forEach(target => {
      if (window.location.href.includes(target.id)) {
        if (oldid !== target.id) {
          contains = true;
          hrefTarget = target;
        }
      }
    })

    if (contains) setSearchTargetsArr([hrefTarget]);
  }, [window.location.href, searchTargetsArr, searchTypesArr]);

  return (
    <>
      <h1>Search</h1>
      <h2>Search type</h2>
      <SelectTable data={searchTypes} columnMap={["name"]} selectArr={searchTypesArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} />
        <Switch>
          <Route path={`${match.path}/compare`}>
            <h2>Search targets</h2>
            <SelectTable data={searchTargets} columnMap={["name"]} selectArr={searchTargetsArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} />
            <Switch>
              <Route path={`${match.path}/compare/lings`}>
                <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))}</h2>
                <SelectTable data={data.lingData} columnMap={["name"]} selectArr={selectArr} setSelectArr={setSelectArr} maxHeight="250px" />
                <Link className="cta" to="results">Search</Link>
              </Route>
            </Switch>
          </Route>
          <Route path={`${match.path}/linglets`}>
            <div />
          </Route>
          <Route path={`${match.path}/properties`}>
            <div />
          </Route>
        </Switch>
    </>
  )
}

export default SearchForm;
