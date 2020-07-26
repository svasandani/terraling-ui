import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../shared/SelectTable';

import SearchParams from './SearchParams';

import { CapitalCase, TargetToPlural } from '../helpers/Helpers';

function SearchForm({ data }) {
  let match = useRouteMatch();

  const [lingArr, setLingArr] = useState([]);
  const [lingletArr, setLingletArr] = useState([]);
  const [propertyArr, setPropertyArr] = useState([]);
  const [searchTypesArr, setSearchTypesArr] = useState([]);
  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  const searchTypes = [{"name": "Any", "id": "any"}, {"name": "Compare", "id": "compare"}, {"name": "Cross", "id": "cross"}];

  if (data.overviewData.depth_maximum > 0) {
    var searchTargets = [{"name": CapitalCase(TargetToPlural(2, data.overviewData.ling0_name)), "id": "lings"}, {"name": CapitalCase(TargetToPlural(2, data.overviewData.ling1_name)), "id": "linglets"}, {"name": "Properties", "id": "properties"}];
  } else {
    var searchTargets = [{"name": CapitalCase(TargetToPlural(2, data.overviewData.ling0_name)), "id": "lings"}, {"name": "Properties", "id": "properties"}];
  }

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
        contains = true;
        if (oldid !== target.id) {
          isNew = true;
          hrefTarget = target;
        }
      }
    })

    if (isNew) setSearchTargetsArr([hrefTarget]);
    else if (!contains && searchTargetsArr.length > 0) setSearchTargetsArr([]);
  }, [window.location.href, searchTargetsArr, searchTypesArr]);

  return (
    <>
      <h1>Search</h1>
      <h2>Search type</h2>
      <SelectTable data={searchTypes} columnMap={["name"]} selectArr={searchTypesArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
        <Switch>
          <Route path={`${match.path}/compare`}>
            <h2>Search targets</h2>
            <SelectTable data={searchTargets} columnMap={["name"]} selectArr={searchTargetsArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
            <Switch>
              <Route path={`${match.path}/compare/lings`}>
                <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} (up to 6)</h2>
                <SelectTable data={data.lingData} columnMap={["name"]} selectArr={lingArr} setSelectArr={setLingArr} maxHeight="250px" />
                <SearchParams params={lingArr} />
                <Link className="cta" to="results">Search</Link>
              </Route>
              <Route path={`${match.path}/compare/linglets`}>
                <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))} (up to 6)</h2>
                <SelectTable data={data.lingletData} columnMap={["name"]} selectArr={lingletArr} setSelectArr={setLingletArr} maxHeight="250px" />
                <SearchParams params={lingletArr} />
                <Link className="cta" to="results">Search</Link>
              </Route>
              <Route path={`${match.path}/compare/properties`}>
                <h2>Properties (up to 6)</h2>
                <SelectTable data={data.propertyData} columnMap={["name"]} selectArr={propertyArr} setSelectArr={setPropertyArr} maxHeight="250px" />
                <SearchParams params={propertyArr} />
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
