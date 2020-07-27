import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';

import SelectTable from '../../shared/SelectTable';

import SearchParams from '../SearchParams';

import { CapitalCase, TargetToPlural } from '../../helpers/Helpers';

function CompareSearch({ data, reset, setSearchData, searchPath }) {
  let match = useRouteMatch();

  const [lingArr, setLingArr] = useState([]);
  const [lingletArr, setLingletArr] = useState([]);
  const [propertyArr, setPropertyArr] = useState([]);

  console.log(data);

  const buildLingSearch = () => {
    let searchArr = {
      search: {
        lings: {"0": lingArr.reduce((ids, ling) => { ids.push(ling.id); return ids; }, [])},
        ling_set: {"0": "compare"}
      },
      group_id: data.id
    }

    setSearchData(searchArr);
  };

  const buildLingletSearch = () => {};
  const buildPropertySearch = () => {};

  let searchTargets = [];

  if (data.overviewData.depth_maximum > 0) {
    searchTargets = [{"name": CapitalCase(TargetToPlural(2, data.overviewData.ling0_name)), "id": "lings"}, {"name": CapitalCase(TargetToPlural(2, data.overviewData.ling1_name)), "id": "linglets"}, {"name": "Properties", "id": "properties"}];
  } else {
    searchTargets = [{"name": CapitalCase(TargetToPlural(2, data.overviewData.ling0_name)), "id": "lings"}, {"name": "Properties", "id": "properties"}];
  }

  const [searchTargetsArr, setSearchTargetsArr] = useState([]);

  useEffect(() => {
    let contains = false;
    let isNew = false;
    let hrefTarget = {};
    let oldid = ""

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
  }, [searchTargetsArr])

  return (
    <>
      <h2>Search target</h2>
      <SelectTable data={searchTargets} columnMap={["name"]} selectArr={searchTargetsArr} find={(el, row) => el.id === row.id} setSelectArr={setSearchTargetsArr} maxSelect={1} link={(url, id) => { return url + "/" + id;}} replaceWithNew={true} />
      <Switch>
        <Route path={`${match.path}/lings`}>
          <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling0_name))} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingArr)}>Reset</Link></h2>
          <SelectTable data={data.lingData} columnMap={["name"]} selectArr={lingArr} setSelectArr={setLingArr} maxHeight="250px" />
          <SearchParams params={lingArr} />
          <Link className="cta" to={`${searchPath}/results`} onClick={buildLingSearch}>Search</Link>
        </Route>
        <Route path={`${match.path}/linglets`}>
          {
            data.overviewData.depth_maximum > 0 ?
            (
              <>
                <h2>{CapitalCase(TargetToPlural(2, data.overviewData.ling1_name))} (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setLingletArr)}>Reset</Link></h2>
                <SelectTable data={data.lingletData} columnMap={["name"]} selectArr={lingletArr} setSelectArr={setLingletArr} maxHeight="250px" />
                <SearchParams params={lingletArr} />
                <Link className="cta" to={`${searchPath}/results`} onClick={buildLingletSearch}>Search</Link>
              </>
            ) :
            (
              null
            )
          }
        </Route>
        <Route path={`${match.path}/properties`}>
          <h2>Properties (up to 6) <Link className="reset-btn" to="." onClick={(e) => reset(e, setPropertyArr)}>Reset</Link></h2>
          <SelectTable data={data.propertyData} columnMap={["name"]} selectArr={propertyArr} setSelectArr={setPropertyArr} maxHeight="250px" />
          <SearchParams params={propertyArr} />
          <Link className="cta" to={`${searchPath}/results`} onClick={buildPropertySearch}>Search</Link>
        </Route>
      </Switch>
    </>
  )
}

export default CompareSearch;
